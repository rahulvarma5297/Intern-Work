import { OTPRequestDto, OTPRequestValidationDto } from '@/dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import authService from '@/services/auth.service';
import bankidServices from '@/services/bankid.services';
import db from '@/services/db.services';
import emailServices from '@/services/email.services';
import { User } from '@prisma/client';

import { NextFunction, Request, Response } from 'express';

export class AuthController {
  //GET Function to hand the OTP request
  public getOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const otpData: OTPRequestDto = req.body;
      if (otpData.type !== 'EMAIL') {
        throw new HttpException(501, 'Not implemented');
      }

      //Generate an OTP using otp-gen-agent
      const otp = await authService.generateOTP(otpData.value, otpData.type);

      //Send the OTP to the user's email using the Email service
      await emailServices.sendOTP(otpData.value, otp.otp);

      res.status(200).json({ message: 'OTP sent', token: otp.id });
    } catch (error) {
      next(error);
    }
  };

  //POST Function to handle the OTP validation
  public validateOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const otpData: OTPRequestValidationDto = req.body;

      // Validate the OTP
      const otp = await authService.validateOTP(otpData.token, otpData.otp);

      // Get the user from the database
      let user = await db.user.findFirst({
        where: {
          AuthMode: {
            some: {
              identifier: otp.identifier,
              type: 'EMAIL',
            },
          },
        },
      });

      // Create a new user if the user does not exist
      if (!user) {
        user = await db.user.create({
          data: {
            email: otp.identifier,
            firstName: 'firstName',
            lastName: 'lastName',
            AuthMode: {
              create: {
                identifier: otp.identifier,
                type: 'EMAIL',
              },
            },
          },
        });
      }

      // Generate a JWT token for the user using jsonwebtoken
      const token = await authService.createJWT(user);
      const refreshToken = await authService.createRefreshToken(user);

      res.status(200).json({ jwt: token, refreshToken });
    } catch (error) {
      next(error);
    }
  };

  //POST Function to handle the refresh JWT
  public refreshJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      //Get the refresh token from the request body
      const { refreshToken } = req.body;

      //Get the user id from the refresh token
      const tokenStatus = await authService.getRefreshTokenStatus(refreshToken);

      if (!tokenStatus.isValid) throw new HttpException(401, 'Invalid refresh token');

      //Fetch the user from database.
      const user = await db.user.findUnique({ where: { id: tokenStatus.userId } });

      //Generate a new JWT token for the user
      const token = await authService.createJWT(user);

      res.status(200).json({ jwt: token });
    } catch (error) {
      next(error);
    }
  };

  //GET the autoStartToken from the BankID API
  public getBankIDAutoStartToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const orderInfo = await bankidServices.getAuthStartToken();

      await bankidServices.saveAutoStartCode(orderInfo);
      res.status(200).json({ autoStartToken: orderInfo.autoStartToken });
    } catch (error) {
      next(error);
    }
  };

  //POST Function to handle the BankID authentication
  public validateBankIDAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { autoStartToken } = req.body;

      //Get the order info from the database
      const orderRef = await bankidServices.getOrderRef(autoStartToken);
      const authStatus = await bankidServices.getAuthStatus(orderRef);

      if (!authStatus.completionData || authStatus.status !== 'complete') {
        throw new HttpException(401, 'BankID authentication failed.');
      }

      //Get the user from the database
      let user = await db.user.findFirst({
        where: {
          AuthMode: {
            some: {
              identifier: authStatus.completionData.user.personalNumber,
              type: 'BANKID',
            },
          },
        },
      });

      //Create a new user if the user does not exist
      if (!user) {
        user = await db.user.create({
          data: {
            email: `${authStatus.completionData.user.personalNumber}@bankid.com`,
            firstName: authStatus.completionData.user.givenName,
            lastName: authStatus.completionData.user.surname,
            AuthMode: {
              create: {
                identifier: authStatus.completionData.user.personalNumber,
                type: 'BANKID',
              },
            },
          },
        });
      }

      //Generate a JWT token for the user using jsonwebtoken
      const token = await authService.createJWT(user);
      const refreshToken = await authService.createRefreshToken(user);

      res.status(200).json({ jwt: token, refreshToken });
    } catch (error) {
      next(error);
    }
  };

  // Logout the user
  public logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { refreshToken } = req.body;

      // Delete the refresh token from the Redis database
      await authService.deleteRefreshToken(refreshToken);

      // Add the JWT token to redis with value = 0 and TTL of 1 hour
      await authService.blockJWTToken(req.headers.authorization.split(' ')[1], 0, 60 * 60);

      res.status(200).json({ message: 'User logged out' });
    } catch (error) {
      next(error);
    }
  };
}

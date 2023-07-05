import { RequestWithUser } from '@/interfaces/auth.interface';
import { NextFunction, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuid } from 'uuid';

export const excelMimes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];

/**
 * Middleware to upload a file to the server
 * @param mimeTypes Array of mime types to accept
 * @param destination Destination folder for the uploaded file
 * @returns
 */
export const uploaderMiddleware = (mimeTypes: string[], destination = './uploads') => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { id } = req.user;
      const upload = multer({
        storage: multer.diskStorage({
          destination: function (req, file, cb) {
            cb(null, destination); // specify the upload directory
          },
          filename: function (req, file, cb) {
            const uniqueSuffix = `${id}-${Date.now()}-${uuid()}`;
            const extension = path.extname(file.originalname);
            cb(null, file.fieldname + '-' + uniqueSuffix + extension);
          },
        }),
        limits: {
          fileSize: 10000000,
        },
        fileFilter: (req, file, cb) => {
          if (!mimeTypes.includes(file.mimetype)) {
            cb(new Error('Only excel files are allowed!'));
          }
          cb(null, true);
        },
      }).single('file');

      upload(req, res, err => {
        if (err) {
          next(err);
        } else {
          next();
        }
      });
    } catch (error) {
      next(error);
    }
  };
};

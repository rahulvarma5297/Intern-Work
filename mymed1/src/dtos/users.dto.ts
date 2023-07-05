import { Relation, User } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import {
  ArrayUnique,
  IsArray,
  IsAscii,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

//Create a class to validate the request body to update the user profile
export class UpdateUserDto implements Partial<User> {
  @IsString()
  @MaxLength(128)
  public firstName: string;

  @IsString()
  @MaxLength(128)
  public lastName: string;

  @IsNumberString()
  @MaxLength(128)
  public phone: string;

  @IsEnum(['M', 'F', 'O', 'U'], { message: 'Type must be either M or F or O or U' })
  @IsNotEmpty()
  public gender: string;

  @IsNumber()
  @Max(500)
  @Min(0)
  public height: Decimal;
}

//Create a class to validate the request body for the OTP request
//consisting of a type field which is an enum of either 'EMAIL' or 'PHONE'
//and a value field which is a string
export class OTPRequestDto {
  @IsEnum(['EMAIL', 'PHONE'], { message: 'Type must be either EMAIL or PHONE' })
  @IsNotEmpty()
  public type: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  public value: string;
}

export class OTPRequestValidationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(6)
  public otp: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  public token: string;
}

export class JWTRefreshRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  public refreshToken: string;
}

//Ignore eslint errors for this class
//Ignore prettier errors for this class

// prettier-ignore
export class PaginationDto {
  @Min(0)
  @IsNumber()
  public start:number;

  @Min(0)
  @Max(100)
  @IsNumber()
  public limit: number;

  @IsString()
  @IsAscii()
  @Length(0, 32)
  @IsOptional()
  public search: string;
}

export class MedicalHistoryDto {
  @IsEnum(['self', 'family'], { message: 'Relation must be either SELF or FAMILY' })
  @IsNotEmpty()
  public relation: Relation = 'self';
}

export class CreateIdListDto {
  @IsNotEmpty()
  @ArrayUnique()
  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  public list: number[];
}

export class ObjectIdDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  public id: number;
}
export const healthParams = [
  'Puls (slag/min)',
  'Diastoliskt (mmHg)',
  'Systoliskt (mmHg)',
  'weight',
  'bloodPressure',
  'bloodSugarFasting',
  'bloodSugarPP',
  'bloodSugarHBA1C',
  'spo2',
  'pulseRate',
  'temperature',
  'sleep',
  'steps',
  'calories',
  'Vikt (Kg)',
  'BMI',
];
export class HealthParamDto {
  @IsEnum(healthParams, {
    message: 'Invalid parameter $value. Accepatble values are: $constraint1',
  })
  @IsNotEmpty()
  name: string;
}

export class HealthParamNameDto {
  @IsEnum(healthParams, {
    each: true,
    message: 'Invalid parameter $value. Acceptable values are: $constraint1',
  })
  @IsOptional()
  name?: string[];
}

export class AddHealthDataDto extends HealthParamDto {
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsNumber()
  deviceId: number = null;
}

export class HealthDataRequestDto extends HealthParamDto {
  @IsDateString()
  @IsNotEmpty()
  start: Date;

  @IsDateString()
  @IsNotEmpty()
  end: Date;
}

export class BankIDValidateDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  public autoStartToken: string;
}

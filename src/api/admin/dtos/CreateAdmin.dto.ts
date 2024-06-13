import {
  IsAlpha,
  IsAlphanumeric,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  ValidateIf,
} from 'class-validator';
import { AdminPermissions } from 'src/database';

export class AdminInput {
  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;

  @ValidateIf(() => false)
  firebaseId!: string;

  @IsOptional()
  permissions?: AdminPermissions;

  @IsNotEmpty()
  @IsAlpha()
  fullName: string;

  @IsOptional()
  createdBy?: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  idNumber: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;

  @IsNotEmpty()
  @IsPhoneNumber(null)
  phone: string;
}

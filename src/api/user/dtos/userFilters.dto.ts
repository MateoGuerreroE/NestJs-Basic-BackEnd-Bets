import {
  IsAlpha,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserStatus } from 'src/database';

export class UserFilters {
  @IsOptional()
  @IsAlpha()
  firstName?: string;

  @IsOptional()
  @IsAlpha()
  gender?: string;

  @IsOptional()
  @IsBoolean()
  deleted?: boolean;

  @IsOptional()
  @IsString()
  userStatus?: UserStatus;

  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @IsOptional()
  @IsString()
  lastUpdatedBy?: string;
}

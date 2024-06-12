import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

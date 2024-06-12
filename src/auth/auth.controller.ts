import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginRequest } from './types/AuthLoginRequest';
import { AuthRegisterRequest } from './types/AuthRegisterRequest';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthLoginRequest) {
    return this.authService.loginUser(body);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterRequest) {
    return this.authService.registerUser(body);
  }
}

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginRequest } from './types/AuthLoginRequest';
import { AuthRegisterRequest } from './types/AuthRegisterRequest';
import { ApiResponse } from 'src/api/types/ApiResponse';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() body: AuthLoginRequest,
  ): Promise<ApiResponse<{ access_token: string }>> {
    const accessToken = await this.authService.loginUser(body);
    return {
      statusCode: HttpStatus.OK,
      payload: accessToken,
    };
  }

  @Post('register')
  async register(
    @Body() body: AuthRegisterRequest,
  ): Promise<ApiResponse<string>> {
    const result = await this.authService.registerUser(body);
    return {
      statusCode: HttpStatus.CREATED,
      payload: result,
    };
  }
}

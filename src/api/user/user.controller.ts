import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserInput } from './dtos/userCreation.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { ApiRequest, RequestUser } from '../../auth/guards/guard.types';
import { permissionsValidator } from '../helpers/PermissionValidator';
import { ApiResponse } from '../types/ApiResponse';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() req: ApiRequest,
    @Body() userInfo: UserInput,
  ): Promise<ApiResponse> {
    const user: RequestUser = req.user;
    const isAuthorized = permissionsValidator(user, { create: 'user' });
    if (!isAuthorized)
      throw new UnauthorizedException('Not enought permissions');
    const createdUser = await this.userService.createUser(userInfo);
    return {
      statusCode: HttpStatus.CREATED,
      payload: createdUser,
      message: 'User created successfully',
    };
  }
}

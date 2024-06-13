import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserInput } from './dtos/userCreation.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { ApiRequest, RequestUser } from '../../auth/guards/guard.types';
import { permissionsValidator } from '../helpers/PermissionValidator';
import { ApiResponse } from '../types/ApiResponse';
import { User, UserUniqueAttributeFilters } from 'src/database';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() req: ApiRequest,
    @Body() userInfo: UserInput,
  ): Promise<ApiResponse<User>> {
    const user: RequestUser = req.user;
    permissionsValidator(user, { create: 'user' });
    const createdUser = await this.userService.createUser(userInfo);
    return {
      statusCode: HttpStatus.CREATED,
      payload: createdUser,
      message: 'User created successfully',
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(
    @Req() req: ApiRequest,
    @Query() query: UserUniqueAttributeFilters,
  ): Promise<ApiResponse<User>> {
    const user: RequestUser = req.user;
    permissionsValidator(user, { create: 'user' });
    const foundUser: User = await this.userService.findUser({ ...query });
    return {
      statusCode: HttpStatus.OK,
      payload: foundUser,
    };
  }
}

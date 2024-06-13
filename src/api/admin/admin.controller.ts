import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiRequest, RequestUser } from 'src/auth/guards/guard.types';
import { AdminInput } from './dtos/CreateAdmin.dto';
import { ApiResponse } from '../types/ApiResponse';
import { Admin } from 'src/database';
import { permissionsValidator } from '../helpers';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createAdmin(
    @Req() req: ApiRequest,
    @Body() admin: AdminInput,
  ): Promise<ApiResponse<Admin>> {
    const user: RequestUser = req.user;
    permissionsValidator(user, { create: 'admin' });
    const createdAdmin = await this.adminService.createAdmin(admin);
    return {
      statusCode: HttpStatus.CREATED,
      payload: createdAdmin,
      message: 'Admin created',
    };
  }
}

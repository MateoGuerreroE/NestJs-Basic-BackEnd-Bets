import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AdminInput } from './dtos/CreateAdmin.dto';
import { Admin } from 'src/database';
import { generateNanoId } from '../helpers';

@Injectable()
export class AdminService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createAdmin(adminToCreate: AdminInput): Promise<Admin> {
    const adminAttributes: Admin = {
      ...adminToCreate,
      adminId: generateNanoId(18),
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: adminToCreate.createdBy || 'SYSTEM',
      permissions: adminToCreate.permissions || {
        create: [],
        update: [],
        delete: [],
        get: [],
      },
    };
    return this.databaseService.createAdmin(adminAttributes);
  }
}

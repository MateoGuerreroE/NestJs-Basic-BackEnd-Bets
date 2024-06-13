import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserInput } from './dtos/userCreation.dto';
import { User, UserUniqueAttributeFilters } from 'src/database';
import { generateNanoId } from '../helpers';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createUser(user: UserInput) {
    const creationDate = new Date();
    const userToCreate: User = {
      userId: generateNanoId(18),
      ...user,
      createdAt: creationDate,
      updatedAt: creationDate,
      lastUpdatedBy: 'SYSTEM',
      transactions: [],
    };
    return this.databaseService.createUser(userToCreate);
  }

  async findUser(attributes: UserUniqueAttributeFilters): Promise<User> {
    const user: User | null =
      await this.databaseService.getUserByUniqueFilters(attributes);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}

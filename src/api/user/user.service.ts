import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserInput } from './dtos/userCreation.dto';
import { User } from 'src/database';
import { nanoid } from 'nanoid';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createUser(user: UserInput) {
    const creationDate = new Date();
    const userToCreate: User = {
      userId: nanoid(),
      ...user,
      createdAt: creationDate,
      updatedAt: creationDate,
      lastUpdatedBy: 'SYSTEM',
      transactions: [],
    };
    return this.databaseService.createUser(userToCreate);
  }
}

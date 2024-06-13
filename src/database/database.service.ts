import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin, Bet, Transaction, User } from './entities';
import { Repository } from 'typeorm';
import {
  AdminPermissions,
  BetFilters,
  TransactionFilers,
  UserUniqueAttributeFilters,
} from './types';
import { UserFilters } from 'src/api/user/dtos/userFilters.dto';

// This will be the only service to interact with DB directly.
@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Admin)
    private readonly adminRepositorty: Repository<Admin>,
    @InjectRepository(Transaction)
    private readonly transactionRepositorty: Repository<Transaction>,
    @InjectRepository(Bet) private readonly betRepositorty: Repository<Bet>,
  ) {}

  // Users

  async getUser(userId: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { userId } });
  }

  async getUserByUniqueFilters(
    filters: UserUniqueAttributeFilters,
  ): Promise<User | null> {
    return this.userRepository.findOne({ where: { ...filters } });
  }

  async getAllUsers(filters: UserFilters): Promise<User[]> {
    return this.userRepository.find({ where: { ...filters } });
  }

  async updateUser(
    userId: string,
    attributesToUpdate: Partial<User>,
  ): Promise<number> {
    return (await this.userRepository.update(userId, attributesToUpdate))
      .affected;
  }

  async createUser(userAttributes: Partial<User>): Promise<User> {
    try {
      const result = await this.userRepository.save(userAttributes);
      return result;
    } catch (error: any) {
      if (error.message.includes('Duplicate'))
        throw new ConflictException('Email or identification already axists');
      else throw error;
    }
  }

  async setUserRecordStatus(
    userId: string,
    newRecordStatus: boolean,
  ): Promise<void> {
    this.userRepository.update(userId, {
      deleted: newRecordStatus,
      deletedAt: newRecordStatus ? null : new Date(),
    });
  }

  // Admins

  async getAdmin(adminId: string): Promise<Admin | null> {
    return this.adminRepositorty.findOne({ where: { adminId } });
  }

  async updateAdmin(
    adminId: string,
    attributesToUpdate: Partial<Admin>,
  ): Promise<number> {
    return (await this.adminRepositorty.update(adminId, attributesToUpdate))
      .affected;
  }

  async updateAdminPermissions(
    adminId: string,
    permissions: AdminPermissions,
  ): Promise<number> {
    return (await this.adminRepositorty.update(adminId, { permissions }))
      .affected;
  }

  async createAdmin(adminAttributes: Partial<Admin>): Promise<Admin> {
    return this.adminRepositorty.save(adminAttributes);
  }

  async deleteAdmin(adminId: string): Promise<number> {
    return (await this.adminRepositorty.delete(adminId)).affected;
  }

  // Transaction

  async getTransaction(transactionId: string): Promise<Transaction | null> {
    return this.transactionRepositorty.findOne({ where: { transactionId } });
  }

  async getTransactions(filters: TransactionFilers): Promise<Transaction[]> {
    return this.transactionRepositorty.find({ where: { ...filters } });
  }

  async updateTransaction(
    transactionId: string,
    attributesToUpdate: Partial<Transaction>,
  ): Promise<number> {
    return (
      await this.transactionRepositorty.update(
        transactionId,
        attributesToUpdate,
      )
    ).affected;
  }

  async createTransaction(
    newTransaction: Partial<Transaction>,
  ): Promise<Transaction> {
    return this.transactionRepositorty.save(newTransaction);
  }

  async setTransactionRecordStatus(
    transactionId: string,
    newRecordStatus: boolean,
  ): Promise<void> {
    await this.transactionRepositorty.update(transactionId, {
      deleted: newRecordStatus,
      deletedAt: newRecordStatus ? null : new Date(),
    });
  }

  // Bets

  async getBet(betId: string): Promise<Bet | null> {
    return this.betRepositorty.findOne({ where: { betId } });
  }

  async getBets(betFilters: BetFilters): Promise<Bet[]> {
    return this.betRepositorty.find({ where: { ...betFilters } });
  }

  async updateBet(
    betId: string,
    attributesToUpdate: Partial<Bet>,
  ): Promise<number> {
    return (await this.betRepositorty.update(betId, attributesToUpdate))
      .affected;
  }

  async createBet(newBet: Partial<Bet>): Promise<Bet> {
    return this.betRepositorty.save(newBet);
  }
}

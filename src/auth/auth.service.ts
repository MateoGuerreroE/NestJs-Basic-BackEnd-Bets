import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { AuthLoginRequest } from './types/AuthLoginRequest';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: AuthLoginRequest) {
    const userRecord = await this.databaseService.getUserByEmail(user.email);
    if (!userRecord) throw new UnauthorizedException('Invalid credential');
    const payload = { email: user.email, sub: userRecord.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

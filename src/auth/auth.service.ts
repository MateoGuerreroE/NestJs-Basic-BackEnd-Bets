import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { AuthLoginRequest } from './types/AuthLoginRequest';
import axios from 'axios';
import { FirebaseFailedResponse } from './firebase/firebase.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async validateCredentialsFirebase({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> {
    try {
      await axios.post(
        `${process.env.FIREBASE_AUTH_URL}?key=${process.env.FIREBASE_API_KEY}`,
        { email, password, returnSecureToken: false },
      );
    } catch (error: any) {
      const { error: errorObject }: FirebaseFailedResponse =
        error.response.data;
      if (errorObject.message === 'INVALID_LOGIN_CREDENTIALS')
        throw new UnauthorizedException('Invalid credentials');
      throw new UnauthorizedException(errorObject.message);
    }
  }

  async login(user: AuthLoginRequest) {
    await this.validateCredentialsFirebase(user);
    const userRecord = await this.databaseService.getUserByEmail(user.email);
    if (!userRecord) throw new UnauthorizedException('Invalid credential');
    const payload = { email: user.email, sub: userRecord.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

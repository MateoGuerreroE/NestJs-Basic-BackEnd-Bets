import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginRequest } from './types/AuthLoginRequest';
import axios from 'axios';
import { FirebaseFailedResponse } from './firebase/firebase.type';
import { AuthRegisterRequest } from './types/AuthRegisterRequest';
import { UserService } from 'src/api/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private firebaseAuthUrl: string = process.env.FIREBASE_AUTH_URL;
  private firebaseApiKey: string = process.env.FIREBASE_API_KEY;

  private async validateCredentialsFirebase({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> {
    try {
      const requestUrl = `${this.firebaseAuthUrl}/accounts:signInWithPassword?key=${this.firebaseApiKey}`;
      await axios.post(requestUrl, {
        email,
        password,
        returnSecureToken: false,
      });
    } catch (error: any) {
      const { error: errorObject }: FirebaseFailedResponse =
        error.response.data;
      if (errorObject.message === 'INVALID_LOGIN_CREDENTIALS')
        throw new UnauthorizedException('Invalid credentials');
      throw new UnauthorizedException(errorObject.message);
    }
  }

  private async createFirebaseUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string> {
    try {
      const requestUrl = `${this.firebaseAuthUrl}/accounts:signUp?key=${this.firebaseApiKey}`;
      const { data } = await axios.post(requestUrl, {
        email,
        password,
        returnSecureToken: false,
      });
      return data.localId;
    } catch (error: any) {
      const { error: errorObject }: FirebaseFailedResponse =
        error.response.data;
      if (errorObject.message === 'EMAIL_EXISTS')
        throw new UnauthorizedException('Email already registered');
      throw new UnauthorizedException(errorObject.message);
    }
  }

  async loginUser(user: AuthLoginRequest): Promise<{ access_token: string }> {
    await this.validateCredentialsFirebase(user);
    const userRecord = await this.userService.findUser({
      emailAddress: user.email,
    });
    if (!userRecord) throw new UnauthorizedException('Invalid credential');
    const payload = { email: user.email, sub: userRecord.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerUser(userToRegister: AuthRegisterRequest): Promise<string> {
    const { emailAddress, password, ...user } = userToRegister;
    const firebaseId = await this.createFirebaseUser({
      email: emailAddress,
      password,
    });
    await this.userService.createUser({ ...user, emailAddress, firebaseId });
    return 'User registered, you can now login';
  }
}

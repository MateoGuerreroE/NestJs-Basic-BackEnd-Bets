import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from 'src/database/database.service';
import { RequestUser } from 'src/auth/guards/guard.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly databaseService: DatabaseService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<RequestUser> {
    const { sub, email } = payload;
    const user = await this.databaseService.getUser(sub);
    if (user && user.emailAddress === email) {
      return { entityId: sub, email: email, role: 'user' };
    } else {
      const admin = await this.databaseService.getAdmin(sub);
      if (!admin) throw new UnauthorizedException();
      return {
        entityId: payload.sub,
        email: payload.email,
        role: 'admin',
        permissions: admin.permissions,
      };
    }
  }
}

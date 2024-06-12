import { Module } from '@nestjs/common';

import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ApiModule, AuthModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}

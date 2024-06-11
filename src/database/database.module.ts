import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { DatabaseService } from './database.service';
import { User, Transaction, Admin, Bet } from './entities';

const { MYSQL_DATABASE_HOST, MYSQL_DATABASE_PORT, DB_USER, DB_PASSWORD, ENV } =
  process.env;

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Admin, Transaction, Bet]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: MYSQL_DATABASE_HOST,
      port: parseInt(MYSQL_DATABASE_PORT),
      username: DB_USER,
      password: DB_PASSWORD,
      database: 'playgreen-sports',
      entities: [User, Transaction, Admin, Bet],
      synchronize: ENV === 'dev' && true,
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}

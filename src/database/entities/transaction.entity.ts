import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { TransactionStatus, TransactionType, UserBetOptions } from '../types';
import { User } from './user.entity';
import { Bet } from './bet.entity';

@Entity()
export class Transaction {
  @PrimaryColumn()
  transactionId: string;

  @Column()
  transactionType: TransactionType;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ nullable: true })
  withdrawalAmount: number;

  @Column({ nullable: true })
  depositAmount: number;

  @Column({ nullable: true })
  betAmount: number;

  @Column({ nullable: true, type: 'json' })
  userBetOptions: UserBetOptions;

  @Column()
  transactionStatus: TransactionStatus;

  @Column()
  transactionDetails: string;

  @Column({ nullable: true })
  betResult: 'won' | 'lost';

  @Column({ default: false })
  deleted: boolean;

  @Column({ type: 'date' })
  updatedAt: Date;

  @Column({ type: 'date', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToOne(() => Bet, (bet) => bet.transaction, { nullable: true })
  @JoinColumn({ name: 'betId' })
  bet?: Bet;
}

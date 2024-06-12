import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Transaction } from './transaction.entity';
import { AdditionalMultiplier, BetResult, BetStatus } from '../types';

@Entity()
export class Bet {
  @PrimaryColumn()
  betId: string;

  @Column()
  sport: string;

  @Column()
  option1: string;

  @Column()
  option2: string;

  @Column()
  option1_multiplier: number;

  @Column()
  option2_multiplier: number;

  @Column({ type: 'json' })
  availableAdditionals: AdditionalMultiplier[];

  @Column({ nullable: true, type: 'json' })
  result: BetResult;

  @Column()
  betStatus: BetStatus;

  @Column({ type: 'date' })
  updatedAt: Date;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ default: 'SYSTEM' })
  updatedBy: string;

  @OneToOne(() => Transaction, (transaction) => transaction.bet)
  transaction: Transaction;
}

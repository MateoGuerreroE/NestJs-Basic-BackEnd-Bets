import { AdditionalMultiplier } from './bet.types';

export interface UserBetOptions {
  winOption: string;
  baseMultiplier: number;
  multiplierOptions: AdditionalMultiplier[];
}

export interface TransactionFilers {
  transactionStatus: TransactionStatus;
  betResult?: 'won' | 'lost';
  transactionType?: TransactionType;
  user?: { userId: string };
  withdrawalAmount?: number;
  depositAmount?: number;
  bet?: { betId: string };
}

export type TransactionType = 'deposit' | 'withdrawal' | 'bet';
export type TransactionStatus =
  | 'completed'
  | 'processing'
  | 'pending'
  | 'cancelled'
  | 'rejected';

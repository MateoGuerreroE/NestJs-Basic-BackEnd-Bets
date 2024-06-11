export interface AdditionalMultiplier {
  condition: string;
  multiplier: number;
}

export interface BetResult {
  optionWon: string;
  additionalsMet: AdditionalMultiplier[];
}

export interface BetFilters {
  sport?: string;
  result?: BetResult;
  betStatus?: BetStatus;
  transaction?: { transactionId: string };
}

export type BetStatus = 'active' | 'cancelled' | 'settled';

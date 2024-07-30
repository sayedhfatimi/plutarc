export type TWallet = {
  account: number;
  currency: string;
  deposited: number;
  withdrawn: number;
  transferIn: number;
  transferOut: number;
  amount: number;
  pendingCredit: number;
  pendingDebit: number;
  confirmedDebit: number;
  timestamp: Date;
};

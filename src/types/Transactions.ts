export type TransactionTRFromDB = {
  id: number;
  description: string;
  amount: string;
  transactionDate: string;
  category: string | null;
  transactionType: 'income' | 'expense' | null;
};

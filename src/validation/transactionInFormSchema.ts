import { addDays } from 'date-fns';
import z from 'zod';

export const transactionInFormSchema = z.object({
  transactionType: z.enum(['income', 'expense']),
  categoryId: z.coerce
    .number<number>('Please select a category')
    .positive('Please select a category'),
  transactionDate: z.coerce
    .date<Date>()
    .max(addDays(new Date(), 1), 'Transaction date cannot be in the future'),
  amount: z.coerce
    .number<number>('Please type a number')
    .positive('Amount must be greater than 0'),
  description: z
    .string()
    .min(3, 'Description must contain at least 3 characters')
    .max(300, 'Description must contain a maximum of 300 characters'),
});

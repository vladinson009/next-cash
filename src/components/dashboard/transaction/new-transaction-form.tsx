'use client';

import { type Category } from '@/types/Category';
import TransactionForm, { transactionFormSchema } from './transaction-form';
import { createTransaction } from '@/server-actions/create-transaction';
import { format } from 'date-fns';
import z from 'zod';
import { toast } from 'sonner';

const NewTransactionForm = ({ categories }: { categories: Category[] }) => {
  const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    const result = await createTransaction({
      amount: data.amount,
      transactionDate: format(data.transactionDate, 'yyyy-MM-dd'),
      categoryId: data.categoryId,
      description: data.description,
    });

    if (result.error) {
      toast.warning('Error', {
        description: result.message,
      });
    }
    console.log(result.id);
  };

  return <TransactionForm categories={categories} onSubmit={handleSubmit} />;
};

export default NewTransactionForm;

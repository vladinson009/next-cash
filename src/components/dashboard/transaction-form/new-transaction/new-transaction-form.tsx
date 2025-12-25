'use client';

import { type Category } from '@/types/Category';
import TransactionForm from '../transaction-form';
import { createTransaction } from '@/server-actions/create-transaction';
import { format } from 'date-fns';
import z from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { transactionInFormSchema } from '@/validation/transactionInFormSchema';

const NewTransactionForm = ({ categories }: { categories: Category[] }) => {
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof transactionInFormSchema>) => {
    const result = await createTransaction({
      amount: data.amount,
      transactionDate: format(data.transactionDate, 'yyyy-MM-dd'),
      categoryId: data.categoryId,
      description: data.description,
    });

    if (result.error) {
      toast.error('Error', {
        description: result.message,
      });
      return;
    }
    toast.success('Success', {
      description: result.message,
    });

    const transactionMonth = data.transactionDate.getMonth() + 1;
    const transactionYear = data.transactionDate.getFullYear();

    router.push(
      `/dashboard/transactions?month=${transactionMonth}&year=${transactionYear}`
    );
  };

  return <TransactionForm categories={categories} onSubmit={handleSubmit} />;
};

export default NewTransactionForm;

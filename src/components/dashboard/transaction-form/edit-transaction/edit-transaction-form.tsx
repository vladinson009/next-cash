'use client';

import { type Category } from '@/types/Category';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import TransactionForm from '../transaction-form';
import z from 'zod';
import { updateTransaction } from '@/server-actions/edit-transaction';
import { transactionInFormSchema } from '@/validation/transactionInFormSchema';

type Props = {
  categories: Category[];
  transaction: {
    id: number;
    categoryId: number;
    amount: string;
    description: string;
    transactionDate: string;
  };
};

export const EditTransactionForm = ({ categories, transaction }: Props) => {
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof transactionInFormSchema>) => {
    const result = await updateTransaction({
      id: transaction.id,
      amount: data.amount,
      description: data.description,
      categoryId: data.categoryId,
      transactionDate: format(data.transactionDate, 'yyyy-MM-dd'),
    });

    if (result?.error) {
      toast.error('Error', {
        description: result.message,
      });
      return;
    }
    toast.success('Transaction updated', {
      description: result?.message,
    });

    const transactionMonth = data.transactionDate.getMonth() + 1;
    const transactionYear = data.transactionDate.getFullYear();

    router.push(
      `/dashboard/transactions?month=${transactionMonth}&year=${transactionYear}`
    );
  };

  const defaultValues = {
    amount: Number(transaction.amount),
    categoryId: transaction.categoryId,
    description: transaction.description,
    transactionDate: new Date(transaction.transactionDate),
    transactionType:
      categories.find((category) => category.id === transaction.categoryId)?.type ??
      'income',
  };
  console.log(defaultValues);

  return (
    <TransactionForm
      defaultValues={defaultValues}
      categories={categories}
      onSubmit={handleSubmit}
    />
  );
};

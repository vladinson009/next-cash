'use server';

import { db } from '@/db';
import { transactionsTable } from '@/db/schema';
import { updateTransactionInDBSchema } from '@/validation/transactionInDBSchema';
import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';

type Props = {
  id: number;
  transactionDate: string;
  description: string;
  amount: number;
  categoryId: number;
};

export const updateTransaction = async (data: Props) => {
  const { userId } = await auth();

  if (!userId) {
    return {
      error: true,
      message: 'Unauthorized',
    };
  }

  const validation = updateTransactionInDBSchema.safeParse(data);

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0].message,
    };
  }

  await db
    .update(transactionsTable)
    .set({
      description: data.description,
      amount: data.amount.toString(),
      transactionDate: data.transactionDate,
      categoryId: data.categoryId,
    })
    .where(
      and(eq(transactionsTable.id, data.id), eq(transactionsTable.userId, userId))
    );
};

'use server';

import { db } from '@/db';
import { transactionsTable } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';

export const deleteTransaction = async (transactionId: number) => {
  const { userId } = await auth();

  if (!userId) {
    return {
      error: true,
      message: 'Unauthorized',
    };
  }

  await db
    .delete(transactionsTable)
    .where(
      and(
        eq(transactionsTable.id, transactionId),
        eq(transactionsTable.userId, userId)
      )
    );
};

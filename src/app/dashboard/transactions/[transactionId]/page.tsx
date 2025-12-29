import { EditTransactionForm } from '@/components/dashboard/transaction-form/edit-transaction/edit-transaction-form';
import DeleteTransactionDialog from '@/components/dashboard/transactions/delete-transaction-dialog';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCategories } from '@/data/getCategories';
import { getTransaction } from '@/data/getTransaction';
import { notFound } from 'next/navigation';

const EditTransactionPage = async ({
  params,
}: {
  params: Promise<{ transactionId: string }>;
}) => {
  const paramsValues = await params;
  const transactionId = Number(paramsValues.transactionId);

  if (isNaN(transactionId)) {
    notFound();
  }

  const categories = await getCategories();
  const transaction = await getTransaction(transactionId);

  if (!transaction) {
    notFound();
  }

  return (
    <Card className="max-w-3xl mx-1 md:mx-auto mt-4">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Edit Transaction</span>
          <DeleteTransactionDialog
            transactionId={transaction.id}
            transactionDate={transaction.transactionDate}
            transactionDescription={transaction.description}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EditTransactionForm categories={categories} transaction={transaction} />
        {/* <NewTransactionForm categories={categories} /> */}
      </CardContent>
    </Card>
  );
};

export default EditTransactionPage;

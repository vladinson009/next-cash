import { EditTransactionForm } from '@/components/dashboard/transaction-form/edit-transaction/edit-transaction-form';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCategories } from '@/data/getCategories';
import { getTransaction } from '@/data/getTransaction';
import Link from 'next/link';
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
  console.log('Transaction from page');
  console.log(transaction);

  if (!transaction) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto py-10">
      {/* Breadcrumb navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard/transactions">Transactions</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Transaction</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Card for Edit transaction */}

      <Card className="mt-4 max-w-3xl">
        <CardHeader>
          <CardTitle>Edit Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <EditTransactionForm categories={categories} transaction={transaction} />
          {/* <NewTransactionForm categories={categories} /> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default EditTransactionPage;

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { getTransactionByMonth } from '@/data/getTransactionsByMonth';
import { format } from 'date-fns';
import Link from 'next/link';
import z from 'zod';
import Filters from '@/components/dashboard/transactions/filtered-transaction';
import { getTransactionYearsRange } from '@/data/getTransactionYearsRange';
import { TransactionsTable } from '@/components/dashboard/transactions/transactions-table';

type Props = {
  searchParams: Promise<{ year?: string; month?: string }>;
};

const today = new Date();

const searchSchema = z.object({
  year: z.coerce
    .number<number>()
    .min(today.getFullYear() - 100)
    .max(today.getFullYear() + 1)
    .catch(today.getFullYear()),
  month: z.coerce
    .number<number>()
    .min(1)
    .max(12)
    .catch(today.getMonth() + 1),
});

const TransactionsPage = async ({ searchParams }: Props) => {
  const searchParamsValue = await searchParams;
  const { month, year } = searchSchema.parse(searchParamsValue);

  const selectedDate = new Date(year, month - 1, 1);

  const transactions = await getTransactionByMonth({ month, year });

  const yearsRange = await getTransactionYearsRange();

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>{format(selectedDate, 'MMM yyyy')} Transactions</span>
          <div>
            <Filters year={year} month={month} yearsRange={yearsRange} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link href="/dashboard/transactions/new">New Transaction</Link>
        </Button>
        {!transactions?.length && (
          <p className="text-center py-10 text-lg text-muted-foreground">
            There are no transactions for this month
          </p>
        )}
        {!!transactions?.length && (
          <TransactionsTable transactions={transactions} isEdit={true} />
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionsPage;

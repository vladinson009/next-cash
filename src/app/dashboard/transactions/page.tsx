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

  return (
    <div className="max-w-7xl mx-auto py-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Transactions</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span>{format(selectedDate, 'MMM yyyy')} Transactions</span>
            <div>dropdowns</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/dashboard/transactions/new">New Transaction</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;

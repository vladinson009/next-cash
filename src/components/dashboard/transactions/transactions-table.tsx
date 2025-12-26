import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TransactionTRFromDB } from '@/types/Transactions';
import { format } from 'date-fns';
import { PencilIcon } from 'lucide-react';
import Link from 'next/link';
import numeral from 'numeral';

type Props = {
  transactions: TransactionTRFromDB[];
  isEdit: boolean;
};

export const TransactionsTable = ({ transactions, isEdit }: Props) => {
  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Amount</TableHead>
          {isEdit && <TableHead />}
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>
              {format(transaction.transactionDate, 'do MMM yyyy')}
            </TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell className="capitalize">
              <Badge
                className={
                  transaction.transactionType === 'income'
                    ? 'bg-lime-500'
                    : 'bg-orange-500'
                }
              >
                {transaction.transactionType}
              </Badge>
            </TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell>€ {numeral(transaction.amount).format('0,0[.]00')}</TableCell>
            {isEdit && (
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  asChild
                  size="icon"
                  aria-label="Edit transaction"
                >
                  <Link href={`/dashboard/transactions/${transaction.id}`}>
                    <PencilIcon />
                  </Link>
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

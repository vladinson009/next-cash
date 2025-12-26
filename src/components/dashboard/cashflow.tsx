import { getAnnualCashflow } from '@/data/getAnnualCashflow';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { CashflowFilters } from './cashflow-filters';
import { getTransactionYearsRange } from '@/data/getTransactionYearsRange';

type Props = { year: number };

export const Cashflow = async ({ year }: Props) => {
  const [cashflow, yearsRange] = await Promise.all([
    getAnnualCashflow(year),
    getTransactionYearsRange(),
  ]);

  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Cashflow</span>
          <CashflowFilters yearsRange={yearsRange} year={year} />
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

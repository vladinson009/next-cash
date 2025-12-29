import { getAnnualCashflow } from '@/data/getAnnualCashflow';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CashflowFilters } from './cashflow-filters';
import { getTransactionYearsRange } from '@/data/getTransactionYearsRange';
import { CashflowContent } from './cashflow-content';

type Props = { year: number };

export const Cashflow = async ({ year }: Props) => {
  const [cashflow, yearsRange] = await Promise.all([
    getAnnualCashflow(year),
    getTransactionYearsRange(),
  ]);

  return (
    <Card className="mb-5 mx-1">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Cashflow</span>
          <CashflowFilters yearsRange={yearsRange} year={year} />
        </CardTitle>
      </CardHeader>
      {/* <CardContent className="grid md:grid-cols-[1fr_250px] "> */}
      <CardContent className="flex flex-col md:flex-row">
        <CashflowContent annualCashflow={cashflow} />
      </CardContent>
    </Card>
  );
};

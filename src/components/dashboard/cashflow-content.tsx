'use client';

import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import numeral from 'numeral';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type Props = {
  annualCashflow: { month: number; income: number; expenses: number }[];
};

export const CashflowContent = ({ annualCashflow }: Props) => {
  const today = new Date();
  const totalAnnualIncome = annualCashflow.reduce((prevValue: number, month) => {
    return prevValue + month.income;
  }, 0);
  const totalAnnualExpenses = annualCashflow.reduce((prevValue: number, month) => {
    return prevValue + month.expenses;
  }, 0);
  const balance = totalAnnualIncome - totalAnnualExpenses;
  const balanceColor = balance >= 0 ? 'text-lime-500' : 'text-orange-500';
  return (
    <>
      <ChartContainer
        config={{
          income: { label: 'Income', color: '#84cc16' },
          expenses: {
            label: 'Expenses',
            color: '#f97316',
          },
        }}
        className="w-full h-75"
      >
        <BarChart data={annualCashflow}>
          <CartesianGrid vertical={false} />
          <YAxis
            tickFormatter={(value) => {
              return `$${numeral(value).format('0,0')}`;
            }}
          />
          <XAxis
            tickFormatter={(value) => {
              return format(new Date(today.getFullYear(), value, 1), 'MMM');
            }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(value, payload) => {
                  const month = payload[0]?.payload.month;
                  return (
                    <div>
                      {format(new Date(today.getFullYear(), month - 1, 1), 'MMM')}
                    </div>
                  );
                }}
              />
            }
          />
          <Legend
            verticalAlign="top"
            align="right"
            height={30}
            iconType="circle"
            formatter={(value) => (
              <span className="capitalize text-primary">{value}</span>
            )}
          />
          <Bar dataKey="income" radius={4} fill="var(--color-income)" />
          <Bar dataKey="expenses" radius={4} fill="var(--color-expenses)" />
        </BarChart>
      </ChartContainer>
      <div className="border-l px-4 flex flex-col gap-4 justify-center">
        <div>
          <span className="text-muted-foreground font-bold text-sm">Income</span>
          <h2 className="text-3xl">
            ${numeral(totalAnnualIncome).format('0,0[.]00')}{' '}
          </h2>
        </div>
        <div className="border-t"></div>
        <div>
          <span className="text-muted-foreground font-bold text-sm">Expenses</span>
          <h2 className="text-3xl">
            ${numeral(totalAnnualExpenses).format('0,0[.]00')}{' '}
          </h2>
        </div>
        <div className="border-t"></div>
        <div>
          <span className="text-muted-foreground font-bold text-sm">Balance</span>
          <h2 className={cn('text-3xl font-bold', balanceColor)}>
            ${numeral(balance).format('0,0[.]00')}{' '}
          </h2>
        </div>
      </div>
    </>
  );
};

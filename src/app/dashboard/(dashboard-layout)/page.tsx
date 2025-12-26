import { Cashflow } from '@/components/dashboard/cashflow';
import RecentTransactions from '@/components/dashboard/transactions/recent-transactions';

type Props = {
  searchParams: Promise<{ cfyear: string }>;
};

const DashboardPage = async ({ searchParams }: Props) => {
  const searchParamsValue = await searchParams;

  const today = new Date();
  const parsedYear = Number(searchParamsValue.cfyear);

  const cfYear = Number.isFinite(parsedYear) ? parsedYear : today.getFullYear();

  return (
    <>
      <Cashflow year={cfYear} />
      <RecentTransactions />
    </>
  );
};

export default DashboardPage;

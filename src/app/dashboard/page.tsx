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
    <div className="max-w-7xl mx-auto py-5">
      <h1 className="text-4xl font-semibold pb-5">Dashboard</h1>
      <Cashflow year={cfYear} />
      <RecentTransactions />
    </div>
  );
};

export default DashboardPage;

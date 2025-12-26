import RecentTransactions from '@/components/dashboard/transactions/recent-transactions';

const DashboardPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-5">
      <h1 className="text-4xl font-semibold pb-5">Dashboard</h1>
      <RecentTransactions />
    </div>
  );
};

export default DashboardPage;

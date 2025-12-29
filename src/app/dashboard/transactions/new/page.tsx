import NewTransactionForm from '@/components/dashboard/transaction-form/new-transaction/new-transaction-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCategories } from '@/data/getCategories';

const NewTransactionPage = async () => {
  const categories = await getCategories();

  return (
    <Card className="max-w-3xl mx-1 md:mx-auto mt-4">
      <CardHeader>
        <CardTitle>New Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <NewTransactionForm categories={categories} />
      </CardContent>
    </Card>
  );
};

export default NewTransactionPage;

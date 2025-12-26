import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  return (
    <Card className="m-15 min-h-96">
      <CardHeader>
        <CardTitle className="flex justify-between">
          NextCash Finance Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SignedOut>
          <h1 className="animate-pulse text-3xl">Sign up to get started</h1>
        </SignedOut>
        <SignedIn>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/transactions">Transactions</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/transactions/new">New Transaction</Link>
            </Button>
          </div>
        </SignedIn>
      </CardContent>
    </Card>
  );
}

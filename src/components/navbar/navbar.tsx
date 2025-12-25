import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import { ChartColumnBigIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import UserDropdown from './user-dropdown';

const Navbar = () => {
  return (
    <nav className="bg-primary p-4 text-white h-20 flex items-center justify-between">
      <Link href="/" className="font-bold text-2xl flex gap-1 items-center">
        <ChartColumnBigIcon className="text-lime-500" /> NextCash
      </Link>
      <div>
        <SignedOut>
          <div className="flex items-center">
            <Button asChild variant="link" className="text-white">
              <SignInButton />
            </Button>
            <Button asChild variant="link" className="text-white">
              <SignUpButton />
            </Button>
          </div>
        </SignedOut>
        <SignedIn>
          <UserDropdown />
        </SignedIn>
      </div>
    </nav>
  );
};
export default Navbar;

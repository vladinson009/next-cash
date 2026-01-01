import { Skeleton } from '@/components/ui/skeleton';

const LoadingState = () => {
  return (
    <Skeleton className="bg-zinc-200 h-140 sm:h-100 max-w-3xl mx-1 md:mx-auto mt-4" />
  );
};

export default LoadingState;

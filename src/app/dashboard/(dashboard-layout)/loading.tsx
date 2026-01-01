import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <>
      <Skeleton className="bg-zinc-200 w-full h-100 mb-5" />
      <Skeleton className="bg-zinc-200 w-full h-50 mb-4" />
    </>
  );
};

export default Loading;

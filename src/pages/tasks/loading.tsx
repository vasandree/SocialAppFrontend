import { Skeleton } from '@/components/ui/skeleton.tsx';

export const Loading = () => {
  return (
    <div className="p-6">
      <Skeleton className="h-10 w-48 mb-6" />

      <div className="flex gap-4 overflow-auto pb-4">
        {[1, 2, 3, 4].map((column) => (
          <div
            key={column}
            className="flex-1 min-w-[250px]"
          >
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="w-3 h-3 rounded-full" />
              <Skeleton className="h-6 w-24" />
            </div>

            {[1, 2, 3].map((card) => (
              <div
                key={card}
                className="mb-3"
              >
                <Skeleton className="h-24 w-full rounded-md" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

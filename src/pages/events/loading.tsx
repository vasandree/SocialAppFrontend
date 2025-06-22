import { Skeleton } from '@/components/ui/skeleton.tsx';

export const Loading = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-36" />
      </div>

      <div className="space-y-8">
        {[1, 2, 3].map((section) => (
          <div
            key={section}
            className="space-y-4"
          >
            <Skeleton className="h-6 w-64" />

            {[1, 2].map((card) => (
              <Skeleton
                key={card}
                className="h-24 w-full rounded-md"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

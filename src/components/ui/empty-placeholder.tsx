import { ReactNode } from 'react';
import { Inbox } from 'lucide-react';

export function EmptyPlaceholder({
  description = 'Нет данных',
  children,
}: {
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 opacity-60 w-full h-full min-h-[200px]">
      <Inbox className="w-12 h-12 mb-4 text-muted-foreground" />
      <div className="text-lg font-medium mb-2">{description}</div>
      {children}
    </div>
  );
}

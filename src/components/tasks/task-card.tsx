import { Calendar } from 'lucide-react';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TaskData } from '@/pages';
import { useMobile } from '@/hooks/use-mobile.tsx';

interface TaskCardProps {
  task: TaskData;
  onClick?: () => void;
  onDragStart?: (task: TaskData) => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
}

export const TaskCard = ({ task, onClick, onDragStart, onDragEnd, isDragging }: TaskCardProps) => {
  const isMobile = useMobile();

  const statusColors = {
    open: 'bg-gray-400',
    inProgress: 'bg-yellow-400',
    completed: 'bg-green-400',
    canceled: 'bg-red-500',
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (isMobile) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';
    onDragStart?.(task);
  };

  return (
    <Card
      className={`mb-3 border border-border shadow-sm rounded-xl bg-card hover:shadow-md transition-all duration-200 ${
        isDragging ? 'opacity-50 rotate-2 scale-105' : ''
      }`}
      draggable={!isMobile}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
    >
      <CardContent
        className="p-4 cursor-pointer hover:bg-accent/50 transition-colors rounded-xl"
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-base">{task.name}</CardTitle>
          <div className={`w-2 h-2 rounded-full mt-2 ${statusColors[task.status]}`} />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Calendar className="h-4 w-4" />
            <span>{task.endDate.toString()}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Avatar className="h-5 w-5">
              <AvatarImage
                src={task.socialNode.avatarUrl || '/placeholder.svg'}
                alt={task.socialNode.name}
              />
              <AvatarFallback className="text-xs">{task.socialNode.name[0]}</AvatarFallback>
            </Avatar>
            <span>{task.socialNode.name}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

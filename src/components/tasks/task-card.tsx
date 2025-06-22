import { Calendar } from 'lucide-react';

import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface TaskData {
  id: string;
  title: string;
  date: string;
  assignee: {
    name: string;
    photoUrl?: string;
  };
  status: 'open' | 'inProgress' | 'completed' | 'canceled';
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export const TaskCard = ({ task, onClick }: { task: TaskData; onClick?: () => void }) => {
  const statusColors = {
    open: 'bg-gray-400',
    inProgress: 'bg-yellow-400',
    completed: 'bg-green-400',
    canceled: 'bg-red-500',
  };

  return (
    <Card className="mb-3 border border-border shadow-sm rounded-xl bg-card hover:shadow-md transition-all duration-200">
      <CardContent
        className="p-4 cursor-pointer hover:bg-accent/50 transition-colors rounded-xl"
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-base">{task.title}</CardTitle>
          <div className={`w-2 h-2 rounded-full mt-2 ${statusColors[task.status]}`} />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Calendar className="h-4 w-4" />
            <span>{task.dueDate || task.date}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Avatar className="h-5 w-5">
              <AvatarImage
                src={task.assignee.photoUrl || '/placeholder.svg'}
                alt={task.assignee.name}
              />
              <AvatarFallback className="text-xs">{task.assignee.name[0]}</AvatarFallback>
            </Avatar>
            <span>{task.assignee.name}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

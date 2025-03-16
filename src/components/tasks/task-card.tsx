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
    <Card className="mb-3">
      <CardContent
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-base">{task.title}</CardTitle>
          <div className={`w-2 h-2 rounded-full mt-2 ${statusColors[task.status]}`} />
        </div>

        {task.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description || 'Нет описания'}</p>
        )}

        {task.priority && (
          <div className="mb-3">
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                task.priority === 'high'
                  ? 'bg-red-100 text-red-800'
                  : task.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
              }`}
            >
              {task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'} приоритет
            </span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Calendar className="h-4 w-4" />
            <span>{task.dueDate || task.date}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Avatar className="h-5 w-5">
              <AvatarImage
                src={task.assignee.photoUrl}
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

import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { TaskData } from './task-card';

interface TaskDetailPanelProps {
  task: TaskData;
  onClose: () => void;
}

export const TaskDetailPanel = ({ task, onClose }: TaskDetailPanelProps) => {
  const statusOptions = [
    { value: 'open', label: 'Открыто' },
    { value: 'inProgress', label: 'В процессе' },
    { value: 'completed', label: 'Завершено' },
    { value: 'canceled', label: 'Отменено' },
  ];

  const currentStatus = statusOptions.find((option) => option.value === task.status);

  return (
    <div className="fixed top-0 right-0 bottom-0 z-50 w-full md:w-96 bg-white shadow-lg overflow-auto md:border-l">
      <div className="p-6 flex flex-col">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={onClose}
            className="-ml-2 mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{task.title}</h1>
        </div>

        <div className="mb-6">
          <label className="text-sm text-gray-500 mb-1 block">Статус</label>
          <Select defaultValue={task.status}>
            <SelectTrigger className="w-full">
              <SelectValue>{currentStatus?.label || 'Выберите статус'}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="h-4 w-4" />
            <span>{task.date}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <User className="h-4 w-4" />
            <span>{task.assignee.name}</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-medium mb-2">Описание</h2>
          <p className="text-gray-600 whitespace-pre-wrap">
            {task.description ||
              'Описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание'}
          </p>
        </div>

        <div className="mt-auto pt-6 flex gap-2">
          <Button className="flex-1">Сохранить</Button>
          <Button
            variant="outline"
            className="flex-1"
          >
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
};

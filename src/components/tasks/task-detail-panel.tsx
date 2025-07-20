import { ArrowLeft, Calendar, User } from 'lucide-react';

import type { TaskData } from './task-card';

import { Button } from '@/components/ui/button';
import { useMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/app/language-context.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TaskDetailPanelProps {
  task: TaskData;
  onClose: () => void;
}

export const TaskDetailPanel = ({ task, onClose }: TaskDetailPanelProps) => {
  const isMobile = useMobile();
  const { t } = useLanguage();

  const statusOptions = [
    { value: 'open', label: t('tasks.open') },
    { value: 'inProgress', label: t('tasks.inProgress') },
    { value: 'completed', label: t('tasks.completed') },
    { value: 'canceled', label: t('tasks.canceled') },
  ];

  const currentStatus = statusOptions.find((option) => option.value === task.status);

  return (
    <div className="fixed inset-0 z-50 bg-background shadow-lg overflow-auto">
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
          <label className="text-sm text-muted-foreground mb-1 block">{t('common.status')}</label>
          <Select defaultValue={task.status}>
            <SelectTrigger className="w-full">
              <SelectValue>{currentStatus?.label || t('common.status')}</SelectValue>
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
          <div className="flex items-center gap-2 text-foreground">
            <Calendar className="h-4 w-4" />
            <span>{task.date}</span>
          </div>

          <div className="flex items-center gap-2 text-foreground">
            <User className="h-4 w-4" />
            <span>{task.assignee.name}</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-medium mb-2">{t('common.description')}</h2>
          <p className="text-muted-foreground whitespace-pre-wrap">
            {task.description ||
              'Описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание'}
          </p>
        </div>

        <div className="mt-auto pt-6 flex gap-2">
          <Button className="flex-1">{t('common.save')}</Button>
          <Button
            variant="outline"
            className="flex-1"
          >
            {t('common.cancel')}
          </Button>
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';

import { PageLayout } from '@/components/layout/page-layout.tsx';
import { TaskCard } from '@/components/tasks/task-card.tsx';
import { TaskColumn } from '@/components/tasks/task-column.tsx';
import { useMobile } from '@/hooks/use-mobile.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { useLanguage } from '@/app/language-context.tsx';
import { useGetTasks } from '@/utils/api/hooks/Tasks/useGetTasks';
import { ListedTaskDto, StatusOfTask } from '@/utils/api'; // Импортируем StatusOfTask
import { Loading } from '@/pages/tasks/loading.tsx';
import { useToast } from '@/hooks/use-toast.ts';
import { usePutEditTaskStatus } from '@/utils/api/hooks';

const statusGroups = [
  { titleKey: 'tasks.open', color: 'bg-gray-400', key: StatusOfTask.Created, listKey: 'openTasks' },
  { titleKey: 'tasks.inProgress', color: 'bg-yellow-400', key: StatusOfTask.InProgress, listKey: 'inProgressTasks' },
  { titleKey: 'tasks.completed', color: 'bg-green-400', key: StatusOfTask.Done, listKey: 'completedTasks' },
  { titleKey: 'tasks.canceled', color: 'bg-red-500', key: StatusOfTask.Cancelled, listKey: 'cancelledTasks' },
] as const;

export type TaskStatus = StatusOfTask;

type TaskWithStatus = ListedTaskDto & { status: TaskStatus };

export type TaskData = ListedTaskDto & { status: TaskStatus };

interface TaskViewProps {
  tasksDto: TaskWithStatus[];
}

const MobileTaskView = ({ tasksDto }: TaskViewProps) => {
  const [selectedStatus, setSelectedStatus] = useState<'all' | TaskStatus>('all');
  const { t } = useLanguage();

  const filteredTasks = selectedStatus === 'all' ? tasksDto : tasksDto.filter((task) => task.status === selectedStatus);

  const currentStatusGroup =
    selectedStatus === 'all'
      ? { title: t('tasks.title'), color: 'bg-primary' }
      : (() => {
          const group = statusGroups.find((group) => group.key === selectedStatus);
          return group ? { title: t(group.titleKey), color: group.color } : { title: '', color: '' };
        })();

  return (
    <div className="p-4 pb-20 relative min-h-[300px]">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{t('tasks.title')}</h1>
        </div>
        <Select
          defaultValue="all"
          onValueChange={(value: string) => setSelectedStatus(value as 'all' | TaskStatus)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('common.status')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('tasks.title')}</SelectItem>
            {statusGroups.map((group) => (
              <SelectItem
                key={group.key}
                value={group.key}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${group.color}`} />
                  <span>{t(group.titleKey)}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedStatus === 'all' ? (
        statusGroups.map((group) => {
          const groupTasks = tasksDto.filter((task) => task.status === group.key);
          if (groupTasks.length === 0) return null;

          return (
            <div
              key={group.key}
              className="mb-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-3 h-3 rounded-full ${group.color}`} />
                <h2 className="font-medium">{t(group.titleKey)}</h2>
              </div>
              {groupTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={{ ...task, status: group.key as TaskStatus }}
                />
              ))}
            </div>
          );
        })
      ) : (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-3 h-3 rounded-full ${currentStatusGroup?.color}`} />
            <h2 className="font-medium">{currentStatusGroup?.title}</h2>
          </div>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const DesktopTaskView = ({ tasksDto }: TaskViewProps) => {
  const [tasks, setTasks] = useState<TaskData[]>(tasksDto);
  const { t } = useLanguage();
  const { toast } = useToast();
  const editTaskStatus = usePutEditTaskStatus();

  const handleTaskMove = (taskId: string, newStatus: StatusOfTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task));

      const task = prevTasks.find((t) => t.id === taskId);
      if (task) {
        const statusLabels = {
          [StatusOfTask.Created]: t('tasks.open'),
          [StatusOfTask.InProgress]: t('tasks.inProgress'),
          [StatusOfTask.Done]: t('tasks.completed'),
          [StatusOfTask.Cancelled]: t('tasks.canceled'),
        };

        toast({
          title: 'Задача перемещена',
          description: `"${task.name}" перемещена в "${statusLabels[newStatus]}"`,
        });

        editTaskStatus.mutate({
          id: taskId,
          params: { status: newStatus },
        });
      }

      return updatedTasks;
    });
  };

  const openTasks = tasks.filter((task) => task.status === StatusOfTask.Created);
  const inProgressTasks = tasks.filter((task) => task.status === StatusOfTask.InProgress);
  const completedTasks = tasks.filter((task) => task.status === StatusOfTask.Done);
  const canceledTasks = tasks.filter((task) => task.status === StatusOfTask.Cancelled);

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('tasks.title')}</h1>
      </div>

      <div className="flex gap-4 overflow-auto pb-4">
        <TaskColumn
          title={t('tasks.open')}
          tasks={openTasks}
          color="bg-gray-400"
          status={StatusOfTask.Created}
          onTaskMove={handleTaskMove}
        />
        <TaskColumn
          title={t('tasks.inProgress')}
          tasks={inProgressTasks}
          color="bg-yellow-400"
          status={StatusOfTask.InProgress}
          onTaskMove={handleTaskMove}
        />
        <TaskColumn
          title={t('tasks.completed')}
          tasks={completedTasks}
          color="bg-green-400"
          status={StatusOfTask.Done}
          onTaskMove={handleTaskMove}
        />
        <TaskColumn
          title={t('tasks.canceled')}
          tasks={canceledTasks}
          color="bg-red-500"
          status={StatusOfTask.Cancelled}
          onTaskMove={handleTaskMove}
        />
      </div>
    </div>
  );
};

export const TasksPage = () => {
  const isMobile = useMobile();

  const { data: tasksDto, isLoading } = useGetTasks({});

  const allTasks: TaskWithStatus[] = tasksDto
    ? [
        ...tasksDto.openTasks.map((t) => ({ ...t, status: StatusOfTask.Created })),
        ...tasksDto.inProgressTasks.map((t) => ({ ...t, status: StatusOfTask.InProgress })),
        ...tasksDto.completedTasks.map((t) => ({ ...t, status: StatusOfTask.Done })),
        ...tasksDto.cancelledTasks.map((t) => ({ ...t, status: StatusOfTask.Cancelled })),
      ]
    : [];

  if (isLoading) {
    return (
      <PageLayout currentPage="tasks">
        <div className="p-4">
          <Loading />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout currentPage="tasks">
      {isMobile ? <MobileTaskView tasksDto={allTasks} /> : <DesktopTaskView tasksDto={allTasks} />}
    </PageLayout>
  );
};

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';
import { useMobile } from '@/hooks/use-mobile.tsx';
import { Sidebar } from '@/components/layout/sidebar.tsx';
import { MobileNavigation } from '@/components/layout/mobile-navigation.tsx';
import { TaskColumn } from '@/components/tasks/task-column.tsx';
import { TaskCard } from '@/components/tasks/task-card.tsx';

interface TaskData {
  id: string;
  title: string;
  date: string;
  assignee: {
    name: string;
    photoUrl?: string;
  };
  status: 'open' | 'inProgress' | 'completed' | 'canceled';
}

const tasksMock: TaskData[] = Array(12)
  .fill(null)
  .map((_, index) => ({
    id: `task-${index + 1}`,
    title: 'Название',
    date: '1.01.2024',
    assignee: {
      name: 'Андрей',
      photoUrl: undefined,
    },
    status: ['open', 'inProgress', 'completed', 'canceled'][Math.floor(index / 3) % 4] as TaskData['status'],
  }));

const MobileTaskView = () => {
  const statusGroups = [
    { title: 'Открыто', color: 'bg-gray-400', key: 'open' },
    { title: 'В процессе', color: 'bg-yellow-400', key: 'inProgress' },
    { title: 'Завершено', color: 'bg-green-400', key: 'completed' },
    { title: 'Отменено', color: 'bg-red-500', key: 'canceled' },
  ];

  return (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">Мои задачи</h1>

      {statusGroups.map((group) => {
        const filteredTasks = tasksMock.filter((task) => task.status === group.key);
        return (
          <div
            key={group.key}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-3 h-3 rounded-full ${group.color}`} />
              <h2 className="font-medium">{group.title}</h2>
            </div>
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

const DesktopTaskView = () => {
  const openTasks = tasksMock.filter((task) => task.status === 'open');
  const inProgressTasks = tasksMock.filter((task) => task.status === 'inProgress');
  const completedTasks = tasksMock.filter((task) => task.status === 'completed');
  const canceledTasks = tasksMock.filter((task) => task.status === 'canceled');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Мои задачи</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Новая задача
        </Button>
      </div>

      <div className="flex gap-4 overflow-auto pb-4">
        <TaskColumn
          title="Открыто"
          tasks={openTasks}
          color="bg-gray-400"
        />
        <TaskColumn
          title="В процессе"
          tasks={inProgressTasks}
          color="bg-yellow-400"
        />
        <TaskColumn
          title="Завершено"
          tasks={completedTasks}
          color="bg-green-400"
        />
        <TaskColumn
          title="Отменено"
          tasks={canceledTasks}
          color="bg-red-500"
        />
      </div>
    </div>
  );
};

export const TasksPage = () => {
  const isMobile = useMobile();

  return (
    <div className="flex h-full">
      <Sidebar currentPage="tasks" />

      <main className="flex-1 overflow-auto">{isMobile ? <MobileTaskView /> : <DesktopTaskView />}</main>

      <MobileNavigation currentPage="tasks" />
    </div>
  );
};

import { Users, Briefcase, Calendar, ImageIcon, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useMobile } from '@/hooks/use-mobile';

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

// Mock data for tasks
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

const TaskCard = ({ task }: { task: TaskData }) => {
  return (
    <Card className="mb-3">
      <CardContent className="p-4">
        <CardTitle className="text-base mb-3">{task.title}</CardTitle>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Calendar className="h-4 w-4" />
            <span>{task.date}</span>
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

const TaskColumn = ({ title, tasks, color }: { title: string; tasks: TaskData[]; color: string }) => {
  return (
    <div className="flex-1 min-w-[250px]">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${color}`} />
        <h2 className="font-medium">{title}</h2>
      </div>
      <div>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}
      </div>
    </div>
  );
};

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

const MobileNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-between p-3 md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="h-14 w-14"
      >
        <ImageIcon className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-14 w-14"
      >
        <Users className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-14 w-14 text-indigo-600"
      >
        <Briefcase className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-14 w-14"
      >
        <Calendar className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-14 w-14"
      >
        <User className="h-8 w-8" />
      </Button>
    </div>
  );
};

export const TasksPage = () => {
  const isMobile = useMobile();

  return (
    <div className="flex h-full">
      <main className="flex-1 overflow-auto">{isMobile ? <MobileTaskView /> : <DesktopTaskView />}</main>

      <MobileNavigation />
    </div>
  );
};

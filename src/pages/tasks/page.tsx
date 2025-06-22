import { useState } from 'react';

import { PageLayout } from '@/components/layout/page-layout.tsx';
import { TaskCard } from '@/components/tasks/task-card.tsx';
import { TaskColumn } from '@/components/tasks/task-column.tsx';
import { TaskDetailPanel } from '@/components/tasks/task-detail-panel.tsx';
import { tasksMock } from '@/lib/mock-data.ts';
import { useMobile } from '@/hooks/use-mobile.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { useLanguage } from '@/lib/language-context.tsx';

const MobileTaskView = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const isMobile = useMobile();
  const { t } = useLanguage();

  const statusGroups = [
    { title: t('tasks.open'), color: 'bg-gray-400', key: 'open' },
    { title: t('tasks.inProgress'), color: 'bg-yellow-400', key: 'inProgress' },
    { title: t('tasks.completed'), color: 'bg-green-400', key: 'completed' },
    { title: t('tasks.canceled'), color: 'bg-red-500', key: 'canceled' },
  ];

  // Filter tasks based on selected status
  const filteredTasks =
    selectedStatus === 'all' ? tasksMock : tasksMock.filter((task) => task.status === selectedStatus);

  const currentStatusGroup =
    selectedStatus === 'all'
      ? { title: t('tasks.title'), color: 'bg-primary' }
      : statusGroups.find((group) => group.key === selectedStatus);

  if (selectedTask) {
    return (
      <TaskDetailPanel
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    );
  }

  return (
    <div className="p-4 pb-20 relative">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{t('tasks.title')}</h1>
        </div>
        <Select
          defaultValue="all"
          onValueChange={setSelectedStatus}
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
                  <span>{group.title}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedStatus === 'all' ? (
        // Display all tasks grouped by status
        statusGroups.map((group) => {
          const groupTasks = tasksMock.filter((task) => task.status === group.key);
          if (groupTasks.length === 0) return null;

          return (
            <div
              key={group.key}
              className="mb-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-3 h-3 rounded-full ${group.color}`} />
                <h2 className="font-medium">{group.title}</h2>
              </div>
              {groupTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => setSelectedTask(task)}
                />
              ))}
            </div>
          );
        })
      ) : (
        // Display tasks for selected status
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-3 h-3 rounded-full ${currentStatusGroup?.color}`} />
            <h2 className="font-medium">{currentStatusGroup?.title}</h2>
          </div>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => setSelectedTask(task)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const DesktopTaskView = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const { t } = useLanguage();

  const openTasks = tasksMock.filter((task) => task.status === 'open');
  const inProgressTasks = tasksMock.filter((task) => task.status === 'inProgress');
  const completedTasks = tasksMock.filter((task) => task.status === 'completed');
  const canceledTasks = tasksMock.filter((task) => task.status === 'canceled');

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
          onTaskClick={setSelectedTask}
        />
        <TaskColumn
          title={t('tasks.inProgress')}
          tasks={inProgressTasks}
          color="bg-yellow-400"
          onTaskClick={setSelectedTask}
        />
        <TaskColumn
          title={t('tasks.completed')}
          tasks={completedTasks}
          color="bg-green-400"
          onTaskClick={setSelectedTask}
        />
        <TaskColumn
          title={t('tasks.canceled')}
          tasks={canceledTasks}
          color="bg-red-500"
          onTaskClick={setSelectedTask}
        />
      </div>

      {selectedTask && (
        <TaskDetailPanel
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export const TasksPage = () => {
  const isMobile = useMobile();

  return <PageLayout currentPage="tasks">{isMobile ? <MobileTaskView /> : <DesktopTaskView />}</PageLayout>;
};

import { useState } from 'react';
import { Share2 } from 'lucide-react';
import { useNavigation } from 'react-router-dom';

import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { PageLayout } from '@/components/layout/page-layout.tsx';
import { TaskCard } from '@/components/tasks/task-card.tsx';
import { EventCard } from '@/components/events/event-card.tsx';
import { TaskDetailPanel } from '@/components/tasks/task-detail-panel.tsx';
import { EventDetailPanel } from '@/components/events/event-detail-panel.tsx';
import { tasksMock, eventsMock } from '@/lib/mock-data.ts';
import { useMobile } from '@/hooks/use-mobile.tsx';

export const WorkspaceDetailPage = ({ params }: { params: { id: string } }) => {
  const router = useNavigation();
  const isMobile = useMobile();
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState('workspace');

  // In a real app, you would fetch the workspace data based on the ID
  const workspace = {
    id: params.id,
    title: 'Название',
    description:
      'Описание описание описание описание описание описание описание описание описание описание описание описание',
    usersCount: 4,
    tasksCount: 4,
    eventsCount: 4,
    members: [
      { id: '1', name: 'Андрей', photoUrl: undefined },
      { id: '2', name: 'Мария', photoUrl: undefined },
      { id: '3', name: 'Иван', photoUrl: undefined },
      { id: '4', name: 'Елена', photoUrl: undefined },
    ],
  };

  // Add this new object with tab descriptions
  const tabDescriptions = {
    workspace: {
      name: 'Рабочее пространство',
      description: 'Визуализация связей и отношений между участниками пространства',
    },
    tasks: {
      name: 'Задачи',
      description: 'Управление задачами и отслеживание их статуса',
    },
    events: {
      name: 'События',
      description: 'Календарь и расписание предстоящих событий',
    },
    people: {
      name: 'Люди',
      description: 'Участники пространства и их взаимосвязи',
    },
  };

  // Filter tasks and events for this workspace (in a real app, this would be done via API)
  const workspaceTasks = tasksMock.slice(0, 3);
  const workspaceEvents = eventsMock.slice(0, 2);

  // Update the component to place events and tasks on separate tabs

  // First, modify the handleTabClick function to properly handle tab switching
  const handleTabClick = (tab: string) => {
    if (tab === 'people' || tab === 'workspace') {
      router.push(`/spaces/${params.id}/whiteboard`);
    } else {
      setActiveTab(tab);
    }
  };

  // Then, replace the content section with this conditional rendering based on activeTab
  return (
    <PageLayout currentPage="spaces">
      <div className="flex flex-col h-full">
        <div className="border-b">
          <div className="flex flex-col p-4">
            <nav className="flex space-x-6">
              <button
                className={`px-4 py-2 ${
                  activeTab === 'workspace'
                    ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium'
                    : 'text-gray-500'
                }`}
                onClick={() => handleTabClick('workspace')}
              >
                Пространство
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === 'tasks' ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium' : 'text-gray-500'
                }`}
                onClick={() => handleTabClick('tasks')}
              >
                Задачи
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === 'events' ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium' : 'text-gray-500'
                }`}
                onClick={() => handleTabClick('events')}
              >
                События
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === 'people' ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium' : 'text-gray-500'
                }`}
                onClick={() => handleTabClick('people')}
              >
                Люди
              </button>
            </nav>
            <div className="mt-2 px-4 py-2 bg-gray-50 rounded-md">
              <h3 className="font-medium text-indigo-600">
                {tabDescriptions[activeTab as keyof typeof tabDescriptions].name}
              </h3>
              <p className="text-sm text-gray-600">
                {tabDescriptions[activeTab as keyof typeof tabDescriptions].description}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 pb-20 md:p-8 md:pb-8 overflow-auto flex-1">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h1 className="text-3xl font-bold">{workspace.title}</h1>
                <p className="text-gray-600 mt-1">{workspace.description}</p>
              </div>
              <Button
                variant="outline"
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Поделиться
              </Button>
            </div>

            {activeTab === 'tasks' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-muted/30 border border-border rounded-xl shadow-sm">
                  <CardContent className="p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-bold text-lg">Открыто</h2>
                    </div>
                    {workspaceTasks
                      .filter((task) => task.status === 'open')
                      .map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onClick={() => setSelectedTask(task)}
                        />
                      ))}
                  </CardContent>
                </Card>

                <Card className="bg-muted/30 border border-border rounded-xl shadow-sm">
                  <CardContent className="p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-bold text-lg">В процессе</h2>
                    </div>
                    {workspaceTasks
                      .filter((task) => task.status === 'inProgress')
                      .map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onClick={() => setSelectedTask(task)}
                        />
                      ))}
                  </CardContent>
                </Card>

                <Card className="bg-muted/30 border border-border rounded-xl shadow-sm">
                  <CardContent className="p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-bold text-lg">Завершено</h2>
                    </div>
                    {workspaceTasks
                      .filter((task) => task.status === 'completed')
                      .map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onClick={() => setSelectedTask(task)}
                        />
                      ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">События</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {workspaceEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onClick={() => setSelectedEvent(event)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedTask && (
        <TaskDetailPanel
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
      {selectedEvent && (
        <EventDetailPanel
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </PageLayout>
  );
};

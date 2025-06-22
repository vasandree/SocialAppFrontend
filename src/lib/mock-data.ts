import type { SpaceProps } from '@/components/spaces/space-card';
import type { UserData } from '@/components/people/user-card';
import type { TaskData } from '@/components/tasks/task-card';
import type { UserProfile } from '@/components/profile/types';
import type { EventData } from '@/components/events/event-card';

// Spaces mock data
export const spacesMock: SpaceProps[] = [
  {
    id: '1',
    title: 'Название',
    description:
      'Описание описание описание описание описание описание описание описание описание описание описание описание',
    usersCount: 4,
    tasksCount: 4,
    eventsCount: 4,
  },
  {
    id: '2',
    title: 'Название',
    description:
      'Описание описание описание описание описание описание описание описание описание описание описание описание',
    usersCount: 4,
    tasksCount: 4,
    eventsCount: 4,
  },
];

export const availableSpacesMock: SpaceProps[] = [
  {
    id: '3',
    title: 'Название',
    description:
      'Описание описание описание описание описание описание описание описание описание описание описание описание',
    usersCount: 4,
    tasksCount: 4,
    eventsCount: 4,
  },
  {
    id: '4',
    title: 'Название',
    description:
      'Описание описание описание описание описание описание описание описание описание описание описание описание',
    usersCount: 4,
    tasksCount: 4,
    eventsCount: 4,
  },
  {
    id: '5',
    title: 'Название',
    description:
      'Описание описание описание описание описание описание описание описание описание описание описание описание',
    usersCount: 4,
    tasksCount: 4,
    eventsCount: 4,
  },
];

// Users mock data
export const usersMock: UserData[] = Array(9)
  .fill(null)
  .map((_, index) => ({
    id: `user-${index + 1}`,
    firstName: 'Андрей',
    lastName: 'Васильев',
    userName: 'andrey_vasilyev',
    photoUrl: undefined,
    email: index === 0 ? 'email@mail.com' : undefined,
    phone: index === 0 ? '+7 (999) 999 99 99' : undefined,
    relationships: index === 0 ? ['Друг', 'Коллега', 'Одногруппник'] : [],
    socialLinks:
      index === 0
        ? {
            instagram: '@instagram',
            github: '@github',
            telegram: '@telegram',
            vk: '@vk',
          }
        : undefined,
  }));

// Tasks mock data
export const tasksMock: TaskData[] = Array(12)
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

// User profile mock data
export const userProfileMock: UserProfile = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  telegramId: 123456789,
  firstName: 'Андрей',
  lastName: 'Петров',
  userName: 'andrey_petrov',
  photoUrl: '/placeholder.svg?height=300&width=300',
};

// Events mock data
export const eventsMock: EventData[] = [
  {
    id: 'event-1',
    title: 'Название',
    description:
      'Описание описание описание описание описание описание описание описание описание описание описание описание',
    dateRange: '1.01.2024 - 2.01.2024',
    singleDate: '1.01.2024',
    location: 'Место',
    type: 'Тип события',
    participants: [{ name: 'Человек 1' }, { name: 'Человек 2' }, { name: 'Кластер 1' }],
  },
  {
    id: 'event-2',
    title: 'Название',
    description:
      'Описание описание описание описание описание описание описание описание описание описание описание описание',
    dateRange: '1.01.2024 - 7.01.2024',
    singleDate: '1.01.2024',
    location: 'Место',
  },
  {
    id: 'event-3',
    title: 'Название',
    description:
      'Описание описание описание описание описание описание описание описание описание описание описание описание',
    dateRange: '1.01.2024 - 7.01.2024',
    singleDate: '1.01.2024-7.01.2024',
  },
  {
    id: 'event-4',
    title: 'Название',
    description:
      'Описание описание описание описание описание описание описание описание описание описание описание описание',
    dateRange: '1.01.2024 - 31.01.2024',
    singleDate: '1.01.2024',
    location: 'Место',
  },
  {
    id: 'event-5',
    title: 'Название',
    description:
      'Описание описание описание описание описание описание описание описание описание описание описание описание',
    dateRange: '1.01.2024 - 31.12.2024',
    singleDate: '1.01.2024',
    location: 'Место',
  },
];

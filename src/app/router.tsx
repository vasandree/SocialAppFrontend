import { createBrowserRouter } from 'react-router-dom';

import { PageLayout } from '@/components/layout';
import { EventsPage, PeoplePage, ProfilePage, SpacesPage, TasksPage } from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PageLayout currentPage="spaces">
        <SpacesPage />
      </PageLayout>
    ),
  },
  {
    path: '/spaces',
    element: (
      <PageLayout currentPage="spaces">
        <SpacesPage />
      </PageLayout>
    ),
  },
  {
    path: '/profile',
    element: (
      <PageLayout currentPage="profile">
        <ProfilePage />
      </PageLayout>
    ),
  },
  {
    path: '/tasks',
    element: (
      <PageLayout currentPage="tasks">
        <TasksPage />
      </PageLayout>
    ),
  },
  {
    path: '/people',
    element: (
      <PageLayout currentPage="people">
        <PeoplePage />
      </PageLayout>
    ),
  },
  {
    path: '/events',
    element: (
      <PageLayout currentPage="events">
        <EventsPage />
      </PageLayout>
    ),
  },
]);

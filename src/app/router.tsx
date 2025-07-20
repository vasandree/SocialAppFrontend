import { createBrowserRouter } from 'react-router-dom';

import { EventsPage, PeoplePage, PersonPage, ProfilePage, SpacesPage, TasksPage } from '@/pages';
import { routes } from '@/utils/consts/routes.ts';

export const router = createBrowserRouter([
  {
    path: routes.main(),
    element: <SpacesPage />,
  },
  {
    path: routes.spaces(),
    element: <SpacesPage />,
  },
  {
    path: routes.profile(),
    element: <ProfilePage />,
  },
  {
    path: routes.tasks(),
    element: <TasksPage />,
  },
  {
    path: routes.people(),
    element: <PeoplePage />,
  },
  {
    path: routes.events(),
    element: <EventsPage />,
  },
  {
    path: routes.person(),
    element: <PersonPage />,
  },
]);

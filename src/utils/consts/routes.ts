export const routes = {
  main: () => '/',
  spaces: () => '/spaces',
  space: (spaceId: string) => `/spaces/${spaceId}`,
  people: () => '/people',
  person: (personId?: string) => `/people/${personId || ':personId'}`,
  clusterProfile: (clusterId?: string) => `/cluster/${clusterId || ':clusterId'}`,
  placeProfile: (placeId?: string) => `/place/${placeId || ':placeId'}`,
  events: () => '/events',
  eventDetails: (eventId?: string) => `/events/${eventId || ':eventId'}`,
  tasks: () => '/tasks',
  taskDetails: (taskId: string) => `/tasks/${taskId || ':taskId'}`,
  profile: () => '/profile',
};

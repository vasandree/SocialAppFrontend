import { useQuery } from '@tanstack/react-query';

import { getEvents, GetEventsConfig } from '@/utils/api/requests';

export const useGetEvents = (config: GetEventsConfig) =>
  useQuery({
    queryKey: ['events', config],
    queryFn: () => getEvents(config),
  });

import { useQuery } from '@tanstack/react-query';

import { getEventById, GetEventByIdConfig } from '@/utils/api/requests';

export const useGetEventById = (config: GetEventByIdConfig) =>
  useQuery({
    queryKey: ['event', config.id, config],
    queryFn: () => getEventById(config),
  });

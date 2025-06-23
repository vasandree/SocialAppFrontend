import { useQuery } from '@tanstack/react-query';

import { getEventTypes, GetEventTypesConfig } from '@/utils/api/requests';

export const useGetEventTypes = (config: GetEventTypesConfig) =>
  useQuery({
    queryKey: ['event_types', config],
    queryFn: () => getEventTypes(config),
  });

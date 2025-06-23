import { useQuery } from '@tanstack/react-query';

import { getPlaceById, GetPlaceByIdConfig } from '@/utils/api/requests';

export const useGetPlaceById = (config: GetPlaceByIdConfig) =>
  useQuery({
    queryKey: ['place', config.id, config],
    queryFn: () => getPlaceById(config),
  });

import { useQuery } from '@tanstack/react-query';

import { getPlaces, GetPlacesConfig } from '@/utils/api/requests';

export const useGetPlaces = (config: GetPlacesConfig) =>
  useQuery({
    queryKey: ['places', config.queryParams, config],
    queryFn: () => getPlaces(config),
  });

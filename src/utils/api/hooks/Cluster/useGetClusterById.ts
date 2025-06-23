import { useQuery } from '@tanstack/react-query';

import { getClusterById, GetClusterByIdConfig } from '@/utils/api/requests';

export const useGetClusterById = (config: GetClusterByIdConfig) =>
  useQuery({
    queryFn: () => getClusterById(config),
    queryKey: ['cluster', config.id, config],
  });

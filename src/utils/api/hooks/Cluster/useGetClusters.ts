import { useQuery } from '@tanstack/react-query';

import { getClusters, GetClustersConfig } from '@/utils/api/requests';

export const useGetClusters = (config: GetClustersConfig) =>
  useQuery({
    queryFn: () => getClusters(config),
    queryKey: ['clusters', config.queryParams, config],
  });

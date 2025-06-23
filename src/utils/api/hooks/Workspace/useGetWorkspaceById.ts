import { useQuery } from '@tanstack/react-query';

import { getWorkspaceById, GetWorkspaceByIdConfig } from '@/utils/api/requests';

export const useGetWorkspaceById = (config: GetWorkspaceByIdConfig) =>
  useQuery({
    queryKey: ['workspace', config.id, config],
    queryFn: () => getWorkspaceById(config),
  });

import { useQuery } from '@tanstack/react-query';

import { getWorkspaces, GetWorkspacesConfig } from '@/utils/api/requests';

export const useGetWorkspaces = (config: GetWorkspacesConfig) =>
  useQuery({
    queryKey: ['workspaces', config.queryParams, config],
    queryFn: () => getWorkspaces(config),
  });

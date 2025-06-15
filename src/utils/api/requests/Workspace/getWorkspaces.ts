import { apiInstance, RequestConfig, WorkspacesDto } from '@/utils/api';

export type GetWorkspacesConfig = RequestConfig & {
  queryParams?: {
    page: number;
  };
};

export const getWorkspaces = async (config: GetWorkspacesConfig) => {
  const response = await apiInstance.get<WorkspacesDto>('/workspaces', {
    ...config.config,
    params: {
      ...(config.queryParams || {}),
    },
  });

  return response.data;
};

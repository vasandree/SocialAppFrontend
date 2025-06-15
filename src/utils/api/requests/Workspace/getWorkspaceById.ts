import { apiInstance, RequestConfig, WorkspaceDto } from '@/utils/api';

export type GetWorkspaceByIdConfig = RequestConfig & {
  id: string;
};

export const getWorkspaceById = async (config: GetWorkspaceByIdConfig) => {
  const response = await apiInstance.get<WorkspaceDto>(`/workspaces/${config.id}`, config.config);
  return response.data;
};

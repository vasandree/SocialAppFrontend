import { apiInstance, RequestConfig } from '@/utils/api';

export type DeleteWorkspaceConfig = RequestConfig & {
  id: string;
};

export const deleteWorkspace = async (config: DeleteWorkspaceConfig) => {
  const response = await apiInstance.delete(`/workspaces/${config.id}`, config.config);
  return response.data;
};

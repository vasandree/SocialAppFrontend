import { apiInstance, CreateWorkspaceDto, RequestConfig } from '@/utils/api';

export type PutEditWorkspaceConfig = RequestConfig<CreateWorkspaceDto> & {
  id: string;
};

export const putEditWorkspace = async (config: PutEditWorkspaceConfig) => {
  const response = await apiInstance.put(`/workspaces/${config.id}`, config.params);
  return response.data;
};

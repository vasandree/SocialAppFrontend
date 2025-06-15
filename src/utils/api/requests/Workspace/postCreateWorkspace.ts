import { apiInstance, CreateWorkspaceDto, RequestConfig } from '@/utils/api';

export type PostCreateWorkspaceConfig = RequestConfig<CreateWorkspaceDto>;

export const postCreateWorkspace = async (config: PostCreateWorkspaceConfig) => {
  const response = await apiInstance.post('/workspaces', config.params);
  return response.data;
};

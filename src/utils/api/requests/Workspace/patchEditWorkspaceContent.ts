import { apiInstance, RequestConfig } from '@/utils/api';

export type PatchEditWorkspaceContentConfig = RequestConfig<string> & {
  id: string;
};

export const patchEditWorkspaceContent = async (config: PatchEditWorkspaceContentConfig) => {
  const response = await apiInstance.patch(`/workspaces/${config.id}`, config.params);
  return response.data;
};

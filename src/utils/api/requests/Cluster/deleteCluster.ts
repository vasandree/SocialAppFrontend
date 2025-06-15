import { apiInstance, RequestConfig } from '@/utils/api';

export type DeleteClusterConfig = RequestConfig & {
  id: string;
};

export const deleteCluster = async (config: DeleteClusterConfig) => {
  const response = await apiInstance.delete(`/clusters/${config.id}`, config.config);
  return response.data;
};

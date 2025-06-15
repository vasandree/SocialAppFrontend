import { apiInstance, CreateClusterForm, RequestConfig } from '@/utils/api';

export type PutEditClusterConfig = RequestConfig<CreateClusterForm> & {
  id: string;
};

export const putEditCluster = async (config: PutEditClusterConfig) => {
  const response = await apiInstance.put(`/clusters/${config.id}`, config.params);
  return response.data;
};

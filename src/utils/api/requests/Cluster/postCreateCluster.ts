import { apiInstance, CreateClusterForm, RequestConfig } from '@/utils/api';

export type PostCreateClusterConfig = RequestConfig<CreateClusterForm>;

export const postCreateCluster = async (config: PostCreateClusterConfig) => {
  const response = await apiInstance.post('/clusters', config.params);
  return response.data;
};

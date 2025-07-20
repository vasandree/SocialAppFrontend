import { apiInstance, CreateClusterForm, RequestConfig } from '@/utils/api';

export type PostCreateClusterConfig = RequestConfig<CreateClusterForm>;

export const postCreateCluster = async ({ params, config }: PostCreateClusterConfig) => {
  const response = await apiInstance.postForm('/clusters', params, {
    ...config,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

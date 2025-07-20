import { apiInstance, RequestConfig, ClustersDto } from '@/utils/api';

export type GetClustersConfig = RequestConfig & {
  queryParams?: {
    page?: number;
    searchTerm?: string;
  };
};

export const getClusters = async (config: GetClustersConfig) => {
  const response = await apiInstance.get<ClustersDto>('/clusters', {
    ...config.config,
    params: {
      ...(config.queryParams || {}),
    },
  });
  return response.data;
};

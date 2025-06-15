import { apiInstance, RequestConfig, ClusterDto } from '@/utils/api';

export type GetClusterByIdConfig = RequestConfig & {
  id: string;
};

export const getClusterById = async (config: GetClusterByIdConfig) => {
  const response = await apiInstance.get<ClusterDto>(`/clusters/${config.id}`, config.config);
  return response.data;
};

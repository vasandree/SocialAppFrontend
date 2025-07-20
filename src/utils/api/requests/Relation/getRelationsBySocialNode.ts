import { apiInstance, RequestConfig, RelationDto } from '@/utils/api';

export type GetRelationsBySocialNodeConfig = RequestConfig & {
  id: string;
  queryParams?: { type: string };
};

export const getRelationsBySocialNode = async (config: GetRelationsBySocialNodeConfig) => {
  const { id, queryParams, config: axiosConfig } = config;
  const response = await apiInstance.get<RelationDto[]>(`/social_node/${id}/relations`, {
    ...axiosConfig,
    params: queryParams,
  });
  return response.data;
};

import { apiInstance, RequestConfig, RelationDto } from '@/utils/api';

export type GetRelationByIdConfig = RequestConfig & {
  id: string;
};

export const getRelationById = async (config: GetRelationByIdConfig) => {
  const response = await apiInstance.get<RelationDto>(`/relations/${config.id}`, config.config);
  return response.data;
};

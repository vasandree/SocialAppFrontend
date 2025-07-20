import { apiInstance, CreateRelationDto, RequestConfig } from '@/utils/api';

export type PutEditRelationByIdConfig = RequestConfig<CreateRelationDto> & {
  id: string;
};

export const putEditRelationById = async (config: PutEditRelationByIdConfig) => {
  const response = await apiInstance.put(`/relations/${config.id}`, config.params);
  return response.data;
};

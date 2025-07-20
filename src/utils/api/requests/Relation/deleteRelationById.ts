import { apiInstance, RequestConfig } from '@/utils/api';

export type DeleteRelationByIdConfig = RequestConfig & {
  id: string;
};

export const deleteRelationById = async (config: DeleteRelationByIdConfig) => {
  const response = await apiInstance.delete(`/relations/${config.id}`, config.config);
  return response.data;
};

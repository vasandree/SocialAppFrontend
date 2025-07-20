import { apiInstance, CreateRelationDto, RequestConfig } from '@/utils/api';

export type PostCreateRelationConfig = RequestConfig<CreateRelationDto>;

export const postCreateRelation = async (config: PostCreateRelationConfig) => {
  const response = await apiInstance.post('/relations', config.params);
  return response.data;
};

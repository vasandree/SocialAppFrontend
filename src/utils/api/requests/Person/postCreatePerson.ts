import { apiInstance, CreatePersonForm, RequestConfig } from '@/utils/api';

export type PostCreatePersonConfig = RequestConfig<CreatePersonForm>;

export const postCreatePerson = async (config: PostCreatePersonConfig) => {
  const response = await apiInstance.post('/perosons', config.params);
  return response.data;
};

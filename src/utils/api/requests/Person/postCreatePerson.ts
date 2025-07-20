import { apiInstance, CreatePersonForm, RequestConfig } from '@/utils/api';

export type PostCreatePersonConfig = RequestConfig<CreatePersonForm>;

export const postCreatePerson = async ({ params, config }: PostCreatePersonConfig) => {
  const response = await apiInstance.postForm('/persons', params, {
    ...config,
  });
  return response.data;
};

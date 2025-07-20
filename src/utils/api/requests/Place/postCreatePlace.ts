import { apiInstance, CreatePlaceForm, RequestConfig } from '@/utils/api';

export type PostCreatePlaceConfig = RequestConfig<CreatePlaceForm>;

export const postCreatePlace = async ({ params, config }: PostCreatePlaceConfig) => {
  const response = await apiInstance.postForm('/places', params, {
    ...config,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

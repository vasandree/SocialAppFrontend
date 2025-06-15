import { apiInstance, CreatePlaceForm, RequestConfig } from '@/utils/api';

export type PostCreatePlaceConfig = RequestConfig<CreatePlaceForm>;

export const postCreatePlace = async (config: PostCreatePlaceConfig) => {
  const response = await apiInstance.post('/places', config.params);
  return response.data;
};

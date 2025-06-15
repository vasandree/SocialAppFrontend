import { apiInstance, CreatePersonForm, RequestConfig } from '@/utils/api';

export type PutEditPlaceConfig = RequestConfig<CreatePersonForm> & {
  id: string;
};

export const putEditPlace = async (config: PutEditPlaceConfig) => {
  const response = await apiInstance.put(`/places/${config.id}`, config.params);
  return response.data;
};

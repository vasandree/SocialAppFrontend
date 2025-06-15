import { apiInstance, RequestConfig, PersonDto } from '@/utils/api';

export type GetPlaceByIdConfig = RequestConfig & {
  id: string;
};

export const getPlaceById = async (config: GetPlaceByIdConfig) => {
  const response = await apiInstance.get<PersonDto>(`/places/${config.id}`, config.config);
  return response.data;
};

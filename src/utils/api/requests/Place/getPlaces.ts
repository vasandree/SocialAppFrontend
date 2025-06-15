import { apiInstance, PlacesDto, RequestConfig } from '@/utils/api';

export type GetPlacesConfig = RequestConfig & {
  queryParams?: {
    page: number;
  };
};

export const getPlaces = async (config: GetPlacesConfig) => {
  const response = await apiInstance.get<PlacesDto[]>('/places', {
    ...config.config,
    params: {
      ...(config.queryParams || {}),
    },
  });
  return response.data;
};

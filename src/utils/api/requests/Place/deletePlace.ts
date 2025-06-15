import { apiInstance, RequestConfig } from '@/utils/api';

export type DeletePlaceConfig = RequestConfig & {
  id: string;
};

export const deletePlace = async (config: DeletePlaceConfig) => {
  const response = await apiInstance.delete(`/places/${config.id}`, config.config);
  return response.data;
};

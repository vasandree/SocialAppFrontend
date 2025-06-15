import { apiInstance, RequestConfig } from '@/utils/api';

export type DeleteEventConfig = RequestConfig & {
  id: string;
};

export const deleteCluster = async (config: DeleteEventConfig) => {
  const response = await apiInstance.delete(`/events/${config.id}`, config.config);
  return response.data;
};

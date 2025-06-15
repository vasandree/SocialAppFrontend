import { apiInstance, RequestConfig } from '@/utils/api';

export type DeleteEventTypeConfig = RequestConfig & {
  id: string;
};

export const deleteEventType = async (config: DeleteEventTypeConfig) => {
  const response = await apiInstance.delete(`/clusters/${config.id}`, config.config);
  return response.data;
};

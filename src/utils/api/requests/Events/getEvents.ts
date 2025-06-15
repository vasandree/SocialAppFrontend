import { apiInstance, RequestConfig, ListedEventDto } from '@/utils/api';

export type GetEventsConfig = RequestConfig;

export const getEvents = async (config: GetEventsConfig) => {
  const response = await apiInstance.get<ListedEventDto[]>('/events', config.config);
  return response.data;
};

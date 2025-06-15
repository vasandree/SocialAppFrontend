import { apiInstance, RequestConfig, EventDto } from '@/utils/api';

export type GetEventByIdConfig = RequestConfig & {
  id: string;
};

export const getEventById = async (config: GetEventByIdConfig) => {
  const response = await apiInstance.get<EventDto>(`/events/${config.id}`, config.config);
  return response.data;
};

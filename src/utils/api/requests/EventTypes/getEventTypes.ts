import { apiInstance, EventTypeDto, RequestConfig } from '@/utils/api';

export type GetEventTypesConfig = RequestConfig;

export const getEventTypes = async (config: GetEventTypesConfig) => {
  const response = await apiInstance.get<EventTypeDto[]>('/event_types', config.config);
  return response.data;
};

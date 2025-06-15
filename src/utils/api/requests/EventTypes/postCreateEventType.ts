import { apiInstance, CreateEventTypeDto, RequestConfig } from '@/utils/api';

export type PostCreateEventTypeConfig = RequestConfig<CreateEventTypeDto>;

export const postCreateEventType = async (config: PostCreateEventTypeConfig) => {
  const response = await apiInstance.post('/event_types', config.params);
  return response.data;
};

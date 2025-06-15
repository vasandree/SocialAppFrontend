import { apiInstance, CreateEventDto, RequestConfig } from '@/utils/api';

export type PostCreateEventConfig = RequestConfig<CreateEventDto>;

export const postCreateEvent = async (config: PostCreateEventConfig) => {
  const response = await apiInstance.post('/events', config.params);
  return response.data;
};

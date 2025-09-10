import { apiInstance, CreateEventDto, RequestConfig } from '@/utils/api';
import { useMutation } from '@tanstack/react-query';

export type PostCreateEventConfig = RequestConfig<CreateEventDto>;

export const postCreateEvent = async (config: PostCreateEventConfig) => {
  const response = await apiInstance.post('/events', config.params);
  return response.data;
};

export const usePostCreateEvent = () =>
  useMutation({
    mutationFn: (config: PostCreateEventConfig) => postCreateEvent(config),
  });

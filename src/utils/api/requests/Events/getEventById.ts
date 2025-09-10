import { apiInstance, RequestConfig, EventDto } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

export type GetEventByIdConfig = RequestConfig & {
  id: string;
};

export const getEventById = async (config: GetEventByIdConfig) => {
  const response = await apiInstance.get<EventDto>(`/events/${config.id}`, config.config);
  return response.data;
};

export const useGetEventById = (config: GetEventByIdConfig) =>
  useQuery({
    queryKey: ['event', config.id],
    queryFn: () => getEventById(config),
  });

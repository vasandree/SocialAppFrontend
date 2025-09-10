import { apiInstance, EditEventDto, RequestConfig } from '@/utils/api';
import { useMutation } from '@tanstack/react-query';

export type PutEditEventConfig = RequestConfig<EditEventDto> & {
  id: string;
};

export const putEditEvent = async (config: PutEditEventConfig) => {
  const response = await apiInstance.put(`/events/${config.id}`, config.params);
  return response.data;
};

export const usePutEditEvent = () =>
  useMutation({
    mutationFn: (config: PutEditEventConfig) => putEditEvent(config),
  });

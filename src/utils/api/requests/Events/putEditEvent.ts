import { apiInstance, EditEventDto, RequestConfig } from '@/utils/api';

export type PutEditEventConfig = RequestConfig<EditEventDto> & {
  id: string;
};

export const putEditEvent = async (config: PutEditEventConfig) => {
  const response = await apiInstance.put(`/events/${config.id}`, config.params);
  return response.data;
};

import { apiInstance, CreateEventTypeDto, RequestConfig } from '@/utils/api';

export type PutEditEventTypeConfig = RequestConfig<CreateEventTypeDto> & {
  id: string;
};

export const putEditEventType = async (config: PutEditEventTypeConfig) => {
  const response = await apiInstance.put(`/event_types/${config.id}`, config.params);
  return response.data;
};

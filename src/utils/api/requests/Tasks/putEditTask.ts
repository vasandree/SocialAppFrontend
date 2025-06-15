import { apiInstance, CreateTaskDto, RequestConfig } from '@/utils/api';

export type PutEditTaskConfig = RequestConfig<CreateTaskDto> & {
  id: string;
};

export const putEditTask = async (config: PutEditTaskConfig) => {
  const response = await apiInstance.put(`/tasks/${config.id}`, config.params);
  return response.data;
};

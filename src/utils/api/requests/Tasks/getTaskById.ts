import { apiInstance, RequestConfig, TaskDto } from '@/utils/api';

export type GetTaskByIdConfig = RequestConfig & {
  id: string;
};

export const getTaskById = async (config: GetTaskByIdConfig) => {
  const response = await apiInstance.get<TaskDto>(`/tasks/${config.id}`, config.config);
  return response.data;
};

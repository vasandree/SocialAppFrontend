import { apiInstance, RequestConfig, TasksDto } from '@/utils/api';

export type GetTasksConfig = RequestConfig;

export const getTasks = async (config: GetTasksConfig) => {
  const response = await apiInstance.get<TasksDto>('/tasks', config.config);
  return response.data;
};

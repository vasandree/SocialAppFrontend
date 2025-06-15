import { apiInstance, CreateTaskDto, RequestConfig } from '@/utils/api';

export type PostCreateTaskConfig = RequestConfig<CreateTaskDto>;

export const postCreateTask = async (config: PostCreateTaskConfig) => {
  const response = await apiInstance.post('/tasks', config.params);
  return response.data;
};

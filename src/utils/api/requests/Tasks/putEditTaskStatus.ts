import { apiInstance, RequestConfig, StatusOfTask } from '@/utils/api';

export type PutEditTaskStatusConfig = RequestConfig<StatusOfTask> & {
  id: string;
};

export const putEditTaskStatus = async (config: PutEditTaskStatusConfig) => {
  const response = await apiInstance.put(`/tasks/${config.id}/status`, config.params);
  return response.data;
};

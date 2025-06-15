import { apiInstance, RequestConfig } from '@/utils/api';

export type DeleteTaskConfig = RequestConfig & {
  id: string;
};

export const deleteTask = async (config: DeleteTaskConfig) => {
  const response = await apiInstance.delete(`/tasks/${config.id}`, config.config);
  return response.data;
};

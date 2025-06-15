import { apiInstance, RequestConfig } from '@/utils/api';

export type DeletePersonConfig = RequestConfig & {
  id: string;
};

export const deletePerson = async (config: DeletePersonConfig) => {
  const response = await apiInstance.delete(`/clusters/${config.id}`, config.config);
  return response.data;
};

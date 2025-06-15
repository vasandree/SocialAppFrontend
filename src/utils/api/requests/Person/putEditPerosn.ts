import { apiInstance, CreatePersonForm, RequestConfig } from '@/utils/api';

export type PutEditPersonConfig = RequestConfig<CreatePersonForm> & {
  id: string;
};

export const putEditPerson = async (config: PutEditPersonConfig) => {
  const response = await apiInstance.put(`/persons/${config.id}`, config.params);
  return response.data;
};

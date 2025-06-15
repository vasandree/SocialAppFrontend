import { apiInstance, RequestConfig, PersonDto } from '@/utils/api';

export type GetPersonByIdConfig = RequestConfig & {
  id: string;
};

export const getPersonById = async (config: GetPersonByIdConfig) => {
  const response = await apiInstance.get<PersonDto>(`/persons/${config.id}`, config.config);
  return response.data;
};

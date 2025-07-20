import { apiInstance, PersonsPaginatedDto, RequestConfig } from '@/utils/api';

export type GetPersonsConfig = RequestConfig & {
  queryParams?: {
    page?: number;
    searchTerm?: string;
  };
};

export const getPersons = async (config: GetPersonsConfig) => {
  const response = await apiInstance.get<PersonsPaginatedDto>('/persons', {
    ...config.config,
    params: {
      ...(config.queryParams || {}),
    },
  });

  return response.data;
};

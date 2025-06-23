import { useQuery } from '@tanstack/react-query';

import { getPersons, GetPersonsConfig } from '@/utils/api/requests';

export const useGetPersons = (config: GetPersonsConfig) =>
  useQuery({
    queryKey: ['persons', config.queryParams, config],
    queryFn: () => getPersons(config),
  });

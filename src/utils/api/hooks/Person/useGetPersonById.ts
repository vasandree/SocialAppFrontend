import { useQuery } from '@tanstack/react-query';

import { getPersonById, GetPersonByIdConfig } from '@/utils/api/requests';

export const useGetPersonById = (config: GetPersonByIdConfig) =>
  useQuery({
    queryKey: ['person', config.id, config],
    queryFn: () => getPersonById(config),
  });

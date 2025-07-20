import { useQuery } from '@tanstack/react-query';

import { getRelationById, GetRelationByIdConfig } from '@/utils/api/requests/Relation/getRelationById';

export const useGetRelationById = (config: GetRelationByIdConfig) => {
  return useQuery({
    queryKey: ['relationById', config.id, config],
    queryFn: () => getRelationById(config),
  });
};

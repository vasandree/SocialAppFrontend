import { useQuery } from '@tanstack/react-query';

import {
  getRelationsBySocialNode,
  GetRelationsBySocialNodeConfig,
} from '@/utils/api/requests/Relation/getRelationsBySocialNode';

export const useGetRelationsBySocialNode = (config: GetRelationsBySocialNodeConfig) => {
  return useQuery({
    queryKey: ['relationsBySocialNode', config.id, config.queryParams, config],
    queryFn: () => getRelationsBySocialNode(config),
  });
};

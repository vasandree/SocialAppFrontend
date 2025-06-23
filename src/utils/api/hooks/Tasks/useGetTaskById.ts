import { useQuery } from '@tanstack/react-query';

import { getTaskById, GetTaskByIdConfig } from '@/utils/api/requests';

export const useGetTaskById = (config: GetTaskByIdConfig) =>
  useQuery({
    queryKey: ['task', config.id, config],
    queryFn: () => getTaskById(config),
  });

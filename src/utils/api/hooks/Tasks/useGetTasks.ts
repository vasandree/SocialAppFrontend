import { useQuery } from '@tanstack/react-query';

import { getTasks, GetTasksConfig } from '@/utils/api/requests';

export const useGetTasks = (config: GetTasksConfig) =>
  useQuery({
    queryKey: ['tasks', config],
    queryFn: () => getTasks(config),
  });

import { useMutation } from '@tanstack/react-query';

import { putEditTask, PutEditTaskConfig } from '@/utils/api/requests';

export const usePutEditTask = () =>
  useMutation({
    mutationFn: (config: PutEditTaskConfig) => putEditTask(config),
  });

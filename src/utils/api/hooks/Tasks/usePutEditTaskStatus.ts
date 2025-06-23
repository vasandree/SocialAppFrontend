import { useMutation } from '@tanstack/react-query';

import { putEditTaskStatus, PutEditTaskStatusConfig } from '@/utils/api/requests';

export const usePutEditTaskStatus = () =>
  useMutation({
    mutationFn: (config: PutEditTaskStatusConfig) => putEditTaskStatus(config),
  });

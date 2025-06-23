import { useMutation } from '@tanstack/react-query';

import { deleteTask, DeleteTaskConfig } from '@/utils/api/requests';

export const useDeleteTask = () =>
  useMutation({
    mutationFn: (config: DeleteTaskConfig) => deleteTask(config),
  });

import { useMutation } from '@tanstack/react-query';

import { postCreateTask, PostCreateTaskConfig } from '@/utils/api/requests';

export const usePostCreateTask = () =>
  useMutation({
    mutationFn: (config: PostCreateTaskConfig) => postCreateTask(config),
  });

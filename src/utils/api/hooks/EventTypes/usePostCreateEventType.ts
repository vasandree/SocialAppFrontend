import { useMutation } from '@tanstack/react-query';

import { postCreateEventType, PostCreateEventTypeConfig } from '@/utils/api/requests';

export const usePostCreateEventType = () =>
  useMutation({
    mutationFn: (config: PostCreateEventTypeConfig) => postCreateEventType(config),
  });

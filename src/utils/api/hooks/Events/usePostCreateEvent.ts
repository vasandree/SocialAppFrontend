import { useMutation } from '@tanstack/react-query';

import { postCreateEvent, PostCreateEventConfig } from '@/utils/api/requests';

export const usePostCreateEvent = () =>
  useMutation({
    mutationFn: (config: PostCreateEventConfig) => postCreateEvent(config),
  });

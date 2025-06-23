import { useMutation } from '@tanstack/react-query';

import { putEditEvent, PutEditEventConfig } from '@/utils/api/requests';

export const usePutEditEvent = () =>
  useMutation({
    mutationFn: (config: PutEditEventConfig) => putEditEvent(config),
  });

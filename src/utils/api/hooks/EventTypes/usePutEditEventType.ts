import { useMutation } from '@tanstack/react-query';

import { putEditEventType, PutEditEventTypeConfig } from '@/utils/api/requests';

export const usePutEditEventType = () =>
  useMutation({
    mutationFn: (config: PutEditEventTypeConfig) => putEditEventType(config),
  });

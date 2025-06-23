import { useMutation } from '@tanstack/react-query';

import { deleteEventType, DeleteEventTypeConfig } from '@/utils/api/requests';

export const useDeleteEventType = () =>
  useMutation({
    mutationFn: (config: DeleteEventTypeConfig) => deleteEventType(config),
  });

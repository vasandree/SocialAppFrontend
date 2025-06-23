import { useMutation } from '@tanstack/react-query';

import { deleteEvent, DeleteEventConfig } from '@/utils/api/requests';

export const useDeleteEvent = () =>
  useMutation({
    mutationFn: (config: DeleteEventConfig) => deleteEvent(config),
  });

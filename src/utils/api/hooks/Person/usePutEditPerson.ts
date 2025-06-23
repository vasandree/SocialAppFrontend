import { useMutation } from '@tanstack/react-query';

import { putEditPerson, PutEditPersonConfig } from '@/utils/api/requests';

export const usePutEditPerson = () =>
  useMutation({
    mutationFn: (config: PutEditPersonConfig) => putEditPerson(config),
  });

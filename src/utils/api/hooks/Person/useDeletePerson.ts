import { useMutation } from '@tanstack/react-query';

import { deletePerson, DeletePersonConfig } from '@/utils/api/requests';

export const useDeletePerson = () =>
  useMutation({
    mutationFn: (config: DeletePersonConfig) => deletePerson(config),
  });

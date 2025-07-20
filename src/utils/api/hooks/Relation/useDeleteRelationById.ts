import { useMutation } from '@tanstack/react-query';

import { deleteRelationById, DeleteRelationByIdConfig } from '@/utils/api/requests/Relation/deleteRelationById';

export const useDeleteRelationById = () => {
  return useMutation({
    mutationFn: (config: DeleteRelationByIdConfig) => deleteRelationById(config),
  });
};

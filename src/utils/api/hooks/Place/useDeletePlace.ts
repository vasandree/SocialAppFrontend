import { useMutation } from '@tanstack/react-query';

import { deletePlace, DeletePlaceConfig } from '@/utils/api/requests';

export const useDeletePlace = () =>
  useMutation({
    mutationFn: (config: DeletePlaceConfig) => deletePlace(config),
  });

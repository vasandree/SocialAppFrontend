import { useMutation } from '@tanstack/react-query';

import { putEditPlace, PutEditPlaceConfig } from '@/utils/api/requests';

export const usePutEditPlace = () =>
  useMutation({
    mutationFn: (config: PutEditPlaceConfig) => putEditPlace(config),
  });

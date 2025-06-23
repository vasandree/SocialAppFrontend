import { useMutation } from '@tanstack/react-query';

import { postCreatePlace, PostCreatePlaceConfig } from '@/utils/api/requests';

export const usePostCreatePlace = () =>
  useMutation({
    mutationFn: (config: PostCreatePlaceConfig) => postCreatePlace(config),
  });

import { useMutation } from '@tanstack/react-query';

import { postCreatePerson, PostCreatePersonConfig } from '@/utils/api/requests';

export const usePostCreatePerson = () =>
  useMutation({
    mutationFn: (config: PostCreatePersonConfig) => postCreatePerson(config),
  });

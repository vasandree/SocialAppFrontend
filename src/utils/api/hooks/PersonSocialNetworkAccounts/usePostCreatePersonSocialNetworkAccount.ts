import { useMutation } from '@tanstack/react-query';

import { postCreatePersonSocialNetworkAccount, PostCreatePersonSocialNetworkAccountConfig } from '@/utils/api/requests';

export const usePostCreatePersonSocialNetworkAccount = () =>
  useMutation({
    mutationFn: (config: PostCreatePersonSocialNetworkAccountConfig) => postCreatePersonSocialNetworkAccount(config),
  });

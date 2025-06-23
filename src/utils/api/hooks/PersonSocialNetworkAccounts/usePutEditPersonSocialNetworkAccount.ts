import { useMutation } from '@tanstack/react-query';

import { putEditPersonSocialNetworkAccount, PutEditPersonSocialNetworkAccountConfig } from '@/utils/api/requests';

export const usePutEditPersonSocialNetworkAccount = () =>
  useMutation({
    mutationFn: (config: PutEditPersonSocialNetworkAccountConfig) => putEditPersonSocialNetworkAccount(config),
  });

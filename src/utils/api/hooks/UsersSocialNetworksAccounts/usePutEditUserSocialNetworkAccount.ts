import { useMutation } from '@tanstack/react-query';

import { putEditUserSocialNetworkAccount, PutEditUserSocialNetworkAccountConfig } from '@/utils/api/requests';

export const usePutEditUserSocialNetworkAccount = () =>
  useMutation({
    mutationFn: (config: PutEditUserSocialNetworkAccountConfig) => putEditUserSocialNetworkAccount(config),
  });

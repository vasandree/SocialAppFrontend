import { useMutation } from '@tanstack/react-query';

import { deletePersonSocialNetworkAccount, DeletePersonSocialNetworkAccountConfig } from '@/utils/api/requests';

export const useDeletePersonSocialNetworkAccount = () =>
  useMutation({
    mutationFn: (config: DeletePersonSocialNetworkAccountConfig) => deletePersonSocialNetworkAccount(config),
  });

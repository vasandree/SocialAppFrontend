import { useMutation } from '@tanstack/react-query';

import { deleteUserSocialNetworkAccount, DeleteUsersSocialNetworkAccountConfig } from '@/utils/api/requests';

export const useDeleteUserSocialNetworkAccount = () =>
  useMutation({
    mutationFn: (config: DeleteUsersSocialNetworkAccountConfig) => deleteUserSocialNetworkAccount(config),
  });

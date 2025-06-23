import { useMutation } from '@tanstack/react-query';

import { postCreateUsersSocialNetworkAccounts, PostCreateUsersSocialNetworkAccountsConfig } from '@/utils/api/requests';

export const usePostCreateUsersSocialNetworkAccounts = () =>
  useMutation({
    mutationFn: (config: PostCreateUsersSocialNetworkAccountsConfig) => postCreateUsersSocialNetworkAccounts(config),
  });

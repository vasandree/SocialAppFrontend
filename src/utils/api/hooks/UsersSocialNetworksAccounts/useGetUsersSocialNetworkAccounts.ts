import { useQuery } from '@tanstack/react-query';

import { getUsersSocialNetworkAccounts, GetUsersSocialNetworkAccountsConfig } from '@/utils/api/requests';

export const useGetUsersSocialNetworkAccounts = (config: GetUsersSocialNetworkAccountsConfig) =>
  useQuery({
    queryKey: ['users_social_network_accounts', config.id, config],
    queryFn: () => getUsersSocialNetworkAccounts(config),
  });

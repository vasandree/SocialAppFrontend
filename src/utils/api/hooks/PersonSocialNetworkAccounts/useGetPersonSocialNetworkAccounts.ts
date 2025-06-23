import { useQuery } from '@tanstack/react-query';

import { getPersonSocialNetworkAccounts, GetPersonSocialNetworkAccountsConfig } from '@/utils/api/requests';

export const useGetPersonSocialNetworkAccounts = (config: GetPersonSocialNetworkAccountsConfig) =>
  useQuery({
    queryKey: ['person_social_network_accounts', config.id, config],
    queryFn: () => getPersonSocialNetworkAccounts(config),
  });

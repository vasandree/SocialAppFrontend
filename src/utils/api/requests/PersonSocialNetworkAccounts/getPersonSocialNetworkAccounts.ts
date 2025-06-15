import { apiInstance, RequestConfig, SocialNetworkDto } from '@/utils/api';

export type GetPersonSocialNetworkAccountsConfig = RequestConfig & {
  id: string;
};

export const getPersonSocialNetworkAccounts = async (config: GetPersonSocialNetworkAccountsConfig) => {
  const response = await apiInstance.get<SocialNetworkDto[]>(`/persons/${config.id}/social_networks`, config.config);
  return response.data;
};

import { apiInstance, RequestConfig, SocialNetworkDto } from '@/utils/api';

export type GetUsersSocialNetworkAccountsConfig = RequestConfig & {
  id: string;
};

export const getUsersSocialNetworkAccounts = async (config: GetUsersSocialNetworkAccountsConfig) => {
  const response = await apiInstance.get<SocialNetworkDto[]>(`/users/${config.id}/social_networks`, config.config);
  return response.data;
};

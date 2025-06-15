import { apiInstance, CreateSocialNetworkAccountDto, RequestConfig } from '@/utils/api';

export type PostCreateUsersSocialNetworkAccountsConfig = RequestConfig<CreateSocialNetworkAccountDto> & {
  id: string;
};

export const postCreateUsersSocialNetworkAccounts = async (config: PostCreateUsersSocialNetworkAccountsConfig) => {
  const response = await apiInstance.post(`/users/${config.id}/social_networks`, config.config);
  return response.data;
};

import { apiInstance, RequestConfig } from '@/utils/api';

export type DeleteUsersSocialNetworkAccountConfig = RequestConfig & {
  id: string;
};

export const deleteUserSocialNetworkAccount = async (config: DeleteUsersSocialNetworkAccountConfig) => {
  const response = await apiInstance.delete(`/users/social_networks/${config.id}`, config.config);
  return response.data;
};

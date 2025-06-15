import { apiInstance, RequestConfig } from '@/utils/api';

export type DeletePersonSocialNetworkAccountConfig = RequestConfig & {
  id: string;
};

export const deletePersonSocialNetworkAccount = async (config: DeletePersonSocialNetworkAccountConfig) => {
  const response = await apiInstance.delete(`/persons/social_networks/${config.id}`, config.config);
  return response.data;
};

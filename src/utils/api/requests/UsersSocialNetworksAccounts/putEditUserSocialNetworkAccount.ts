import { apiInstance, EditPersonSocialNetworkAccountDto, RequestConfig } from '@/utils/api';

export type PutEditUserSocialNetworkAccountConfig = RequestConfig<EditPersonSocialNetworkAccountDto> & {
  id: string;
};

export const putEditUserSocialNetworkAccount = async (config: PutEditUserSocialNetworkAccountConfig) => {
  const response = await apiInstance.put(`/users/social_networks/${config.id}`, config.params);
  return response.data;
};

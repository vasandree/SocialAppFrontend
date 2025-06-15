import { apiInstance, EditPersonSocialNetworkAccountDto, RequestConfig } from '@/utils/api';

export type PutEditPersonSocialNetworkAccountConfig = RequestConfig<EditPersonSocialNetworkAccountDto> & {
  id: string;
};

export const putEditPersonSocialNetworkAccount = async (config: PutEditPersonSocialNetworkAccountConfig) => {
  const response = await apiInstance.put(`/persons/social_networks/${config.id}`, config.params);
  return response.data;
};

import { apiInstance, CreateSocialNetworkAccountDto, RequestConfig } from '@/utils/api';

export type PostCreatePersonSocialNetworkAccountConfig = RequestConfig<CreateSocialNetworkAccountDto> & {
  id: string;
};

export const postCreatePersonSocialNetworkAccount = async (config: PostCreatePersonSocialNetworkAccountConfig) => {
  const response = await apiInstance.post(`/perosons/${config.id}/social_networks`, config.params);
  return response.data;
};

import { apiInstance, LoginDto, RequestConfig, TokensDto } from '@/utils/api';

export type PostLoginConfig = RequestConfig<LoginDto> & {
  queryParams?: { socialNetwork?: string };
};

export const postLoginUser = async (config: PostLoginConfig) => {
  const response = await apiInstance.post<TokensDto>('/auth/login', config.params, {
    ...config.config,
    params: {
      ...(config.queryParams || {}),
    },
  });
  return response.data;
};

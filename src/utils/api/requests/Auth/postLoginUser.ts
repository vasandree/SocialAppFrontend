import { apiInstance, AuthResponse, LoginDto, RequestConfig } from '@/utils/api';

export type PostLoginConfig = RequestConfig<LoginDto> & {
  queryParams?: { socialNetwork?: string };
};

export const postLoginUser = async (config: PostLoginConfig) => {
  const response = await apiInstance.post<AuthResponse>('/auth/login', config.params, {
    ...config.config,
    params: {
      ...(config.queryParams || {}),
    },
  });
  return response.data;
};

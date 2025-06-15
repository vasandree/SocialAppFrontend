import { apiInstance, RequestConfig, TokensDto } from '@/utils/api';

export type PostRefreshToken = RequestConfig<TokensDto>;

export const postRefreshToken = async (config: PostRefreshToken) => {
  const response = await apiInstance.post<TokensDto>('/auth/refresh', config.params);
  return response.data;
}
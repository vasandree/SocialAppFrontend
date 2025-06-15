import { apiInstance, RequestConfig, UserDto } from '@/utils/api';

export type GetProfileConfig = RequestConfig;

export const getProfile = async (config: GetProfileConfig) => {
  const response = await apiInstance.get<UserDto>('/users/profile', config.config);
  return response.data;
};

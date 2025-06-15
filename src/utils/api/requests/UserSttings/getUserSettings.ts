import { apiInstance, RequestConfig, UserSettingsDto } from '@/utils/api';

export type GetUserSettingsConfig = RequestConfig;

export const getUserSettings = async (config: GetUserSettingsConfig) => {
  const response = await apiInstance.get<UserSettingsDto>('/users/settings', config.config);
  return response.data;
};

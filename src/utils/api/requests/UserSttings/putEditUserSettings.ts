import { apiInstance, RequestConfig, UserSettingsDto } from '@/utils/api';

export type PutEditUserSettingsConfig = RequestConfig<UserSettingsDto>;

export const putEditUserSettings = async (config: PutEditUserSettingsConfig) => {
  const response = await apiInstance.put(`/users/settings`, config.params);
  return response.data;
};

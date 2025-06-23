import { useQuery } from '@tanstack/react-query';

import { getUserSettings, GetUserSettingsConfig } from '@/utils/api/requests';

export const useGetUserSettings = (config: GetUserSettingsConfig) =>
  useQuery({
    queryKey: ['user_settings', config],
    queryFn: () => getUserSettings(config),
  });

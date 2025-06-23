import { useMutation } from '@tanstack/react-query';

import { putEditUserSettings, PutEditUserSettingsConfig } from '@/utils/api/requests';

export const usePutEditUserSettings = () =>
  useMutation({
    mutationFn: (config: PutEditUserSettingsConfig) => putEditUserSettings(config),
  });

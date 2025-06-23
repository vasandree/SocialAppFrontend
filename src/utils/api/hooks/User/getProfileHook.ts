import { useQuery } from '@tanstack/react-query';

import { getProfile, GetProfileConfig } from '@/utils/api/requests';

export const useGetProfile = (config: GetProfileConfig) =>
  useQuery({
    queryFn: () => getProfile(config),
    queryKey: ['user', config],
  });

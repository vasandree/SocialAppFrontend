import { useMutation } from '@tanstack/react-query';

import { putEditCluster, PutEditClusterConfig } from '@/utils/api/requests';

export const usePutEditCluster = () =>
  useMutation({
    mutationFn: (params: PutEditClusterConfig) => putEditCluster(params),
  });

import { useMutation } from '@tanstack/react-query';

import { postCreateCluster, PostCreateClusterConfig } from '@/utils/api/requests';

export const usePostCreateCluster = () =>
  useMutation({
    mutationFn: (params: PostCreateClusterConfig) => postCreateCluster(params),
  });

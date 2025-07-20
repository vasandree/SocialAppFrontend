import { useMutation } from '@tanstack/react-query';

import { deleteCluster } from '@/utils/api/requests';
import { DeleteClusterConfig } from '@/utils/api/requests/Cluster/deleteCluster.ts';

export const useDeleteCluster = () =>
  useMutation({
    mutationFn: (params: DeleteClusterConfig) => deleteCluster(params),
  });

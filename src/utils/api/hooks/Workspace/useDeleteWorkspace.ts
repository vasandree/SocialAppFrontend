import { useMutation } from '@tanstack/react-query';

import { deleteWorkspace, DeleteWorkspaceConfig } from '@/utils/api/requests';

export const useDeleteWorkspace = () =>
  useMutation({
    mutationFn: (config: DeleteWorkspaceConfig) => deleteWorkspace(config),
  });

import { useMutation } from '@tanstack/react-query';

import { putEditWorkspace, PutEditWorkspaceConfig } from '@/utils/api/requests';

export const usePutEditWorkspace = () =>
  useMutation({
    mutationFn: (config: PutEditWorkspaceConfig) => putEditWorkspace(config),
  });

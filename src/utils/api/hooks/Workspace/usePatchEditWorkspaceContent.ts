import { useMutation } from '@tanstack/react-query';

import { patchEditWorkspaceContent, PatchEditWorkspaceContentConfig } from '@/utils/api/requests';

export const usePatchEditWorkspaceContent = () =>
  useMutation({
    mutationFn: (config: PatchEditWorkspaceContentConfig) => patchEditWorkspaceContent(config),
  });

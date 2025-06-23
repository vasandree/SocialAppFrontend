import { useMutation } from '@tanstack/react-query';

import { postCreateWorkspace, PostCreateWorkspaceConfig } from '@/utils/api/requests';

export const usePostCreateWorkspace = () =>
  useMutation({
    mutationFn: (config: PostCreateWorkspaceConfig) => postCreateWorkspace(config),
  });

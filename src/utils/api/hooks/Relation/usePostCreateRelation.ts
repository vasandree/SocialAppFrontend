import { useMutation } from '@tanstack/react-query';

import { postCreateRelation, PostCreateRelationConfig } from '@/utils/api/requests/Relation/postCreateRelation';

export const usePostCreateRelation = () => {
  return useMutation({
    mutationFn: (config: PostCreateRelationConfig) => postCreateRelation(config),
  });
};

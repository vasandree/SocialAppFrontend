import { useMutation } from '@tanstack/react-query';
import { PostLoginConfig, postLoginUser } from '@/utils/api/requests';


export const usePostLogin = () =>
  useMutation({
    mutationFn: (params: PostLoginConfig) => postLoginUser(params),
  });

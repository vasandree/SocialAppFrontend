import { ReactNode, useEffect } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useDispatch, useSelector } from 'react-redux';

import { getAccessToken, setAccessToken, setRefreshToken } from '@/utils/helpers';
import { AppDispatch, RootState } from '@/utils/redux';
import { fetchUser } from '@/utils/redux/reducers';
import { GetProfileConfig } from '@/utils/api/requests';
import { SocialNetwork } from '@/utils/api';
import { usePostLogin } from '@/utils/api/hooks/Auth/postLoginHook.ts';

interface AuthInitializerProps {
  children: ReactNode;
}

export const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const webApp = useWebApp();
  const initData = webApp?.initData;
  const dispatch: AppDispatch = useDispatch();
  const { value: user, loading, error } = useSelector((state: RootState) => state.user);
  const mutateLogin = usePostLogin();

  const token = getAccessToken();

  const getProfile = () => {
    try {
      const config: GetProfileConfig = {
        config: {},
      };
      dispatch(fetchUser(config));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) return;

    if (!user && !token) {
      mutateLogin.mutate(
        {
          params: { initData: initData },
          queryParams: { socialNetwork: SocialNetwork.Telegram },
        },
        {
          onSuccess: (data) => {
            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);

            getProfile();
          },
        }
      );
    } else if (!user && token) {
      getProfile();
    }
  }, []);
  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  return <>{user && children}</>;
};

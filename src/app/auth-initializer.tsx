import { useEffect, useState } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { usePostLogin } from '@/utils/api/hooks';
import { setAccessToken, setRefreshToken } from '@/utils/helpers';

export const AuthInitializer = () => {
  const webApp = useWebApp();
  const initData = webApp?.initData;
  const mutateLogin = usePostLogin();

  const [isLoginRequested, setIsLoginRequested] = useState(false);

  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (initData && !isLoginRequested && retryCount < 3) {
      setIsLoginRequested(true);
      mutateLogin.mutate(
        {
          params: { initData: initData },
          queryParams: { socialNetwork: 'Telegram' },
        },
        {
          onSuccess: (data) => {
            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
          },
          onError: () => {
            setRetryCount((prevCount) => prevCount + 1);
            setIsLoginRequested(false);
          },
        }
      );
    }
  }, [initData, mutateLogin, isLoginRequested, retryCount]);

  return null;
};
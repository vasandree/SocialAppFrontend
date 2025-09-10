import { useState } from 'react';
import { Send } from 'lucide-react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useMobile } from '@/hooks/use-mobile';
import { usePostLogin } from '@/utils/api/hooks/Auth/postLoginHook.ts';
import { SocialNetwork } from '@/utils/api';
import { setAccessToken, setRefreshToken, getAccessToken } from '@/utils/helpers';
import { routes } from '@/utils/consts/routes.ts';

export const LoginPage = () => {
  const [isTelegramLoading, setIsTelegramLoading] = useState(false);
  const webApp = useWebApp();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useMobile();
  const mutateLogin = usePostLogin();

  if (getAccessToken()) {
    navigate(routes.spaces());
    return null;
  }

  const handleTelegramLogin = async () => {
    setIsTelegramLoading(true);

    mutateLogin.mutate(
      {
        params: { initData: webApp?.initData },
        queryParams: { socialNetwork: SocialNetwork.Telegram },
      },
      {
        onSuccess: (data) => {
          setAccessToken(data.tokens.accessToken);
          setRefreshToken(data.tokens.refreshToken);

          toast({
            title: 'Вход через Telegram выполнен',
            description: `Добро пожаловать!`,
          });

          navigate('/spaces');
        },
        onError: () => {
          toast({
            title: 'Ошибка входа через Telegram',
            description: 'Не удалось войти через Telegram',
            variant: 'destructive',
          });
        },
        onSettled: () => {
          setIsTelegramLoading(false);
        },
      }
    );
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col min-h-screen justify-center">
          {/* Header */}
          <div className="text-center py-8 px-4">
            <h1 className="text-4xl font-bold text-primary mb-2">Social App</h1>
            <p className="text-lg text-muted-foreground">Войдите через Telegram</p>
          </div>

          {/* Content */}
          <div className="flex-1 flex items-center justify-center px-4 pb-8">
            <div className="max-w-sm mx-auto w-full">
              <Button
                type="button"
                className="w-full h-16 text-lg font-semibold rounded-xl bg-[#0088cc] hover:bg-[#0088cc]/90"
                onClick={handleTelegramLogin}
                disabled={isTelegramLoading}
              >
                <Send className="h-6 w-6 mr-3" />
                {isTelegramLoading ? 'Подключение...' : 'Войти через Telegram'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">Social App</h1>
          <p className="text-muted-foreground">Войдите через Telegram</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Вход</CardTitle>
            <CardDescription className="text-center">Используйте Telegram для входа в систему</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              type="button"
              className="w-full h-12 bg-[#0088cc] hover:bg-[#0088cc]/90"
              onClick={handleTelegramLogin}
              disabled={isTelegramLoading}
            >
              <Send className="h-4 w-4 mr-2" />
              {isTelegramLoading ? 'Подключение...' : 'Войти через Telegram'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

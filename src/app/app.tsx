import { WebAppProvider } from '@vkruglikov/react-telegram-web-app';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/app/router.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthInitializer } from '@/app/auth-initializer.tsx';

const queryClient = new QueryClient();


export const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <WebAppProvider>
        <AuthInitializer />
        <RouterProvider router={router} />
      </WebAppProvider>
    </QueryClientProvider>
  );
};

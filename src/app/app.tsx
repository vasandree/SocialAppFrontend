import { WebAppProvider } from '@vkruglikov/react-telegram-web-app';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { router } from '@/app/router.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthInitializer } from '@/app/auth-initializer.tsx';
import { store } from '@/utils/redux';

const queryClient = new QueryClient();
export const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WebAppProvider>
          <AuthInitializer>
            <RouterProvider router={router} />
          </AuthInitializer>
        </WebAppProvider>
      </QueryClientProvider>
    </Provider>
  );
};

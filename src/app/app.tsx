import { WebAppProvider } from '@vkruglikov/react-telegram-web-app';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/app/router.tsx';

export const App = () => {
  return (
    <WebAppProvider>
      <RouterProvider router={router} />
    </WebAppProvider>
  );
};

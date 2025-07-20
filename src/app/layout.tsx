import { ReactNode } from 'react';

import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/app/language-context.tsx';
import { ThemeProvider } from '@/components/theme-provider.tsx';

export const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {children}
        <Toaster />
      </LanguageProvider>
    </ThemeProvider>
  );
};

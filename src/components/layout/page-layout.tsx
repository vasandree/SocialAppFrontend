import type { ReactNode } from 'react';

import { Sidebar } from './sidebar';
import { MobileNavigation } from './mobile-navigation';

interface PageLayoutProps {
  children: ReactNode;
  currentPage: 'spaces' | 'people' | 'tasks' | 'events' | 'profile';
}

export const PageLayout = ({ children, currentPage }: PageLayoutProps) => {
  return (
    <div className="flex h-screen">
      <Sidebar currentPage={currentPage} />
      <main className="flex-1 md:ml-60 overflow-auto">{children}</main>
      <MobileNavigation currentPage={currentPage} />
    </div>
  );
};

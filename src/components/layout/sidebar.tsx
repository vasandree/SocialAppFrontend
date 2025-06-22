import { Users, Briefcase, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useLanguage } from '@/lib/language-context';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { RootState } from '@/utils/redux';

interface SidebarProps {
  currentPage: 'spaces' | 'people' | 'tasks' | 'events' | 'profile';
}

export const Sidebar = ({ currentPage }: SidebarProps) => {
  const { t } = useLanguage();
  const user = useSelector((state: RootState) => state.user.value);

  const navItems = [
    {
      name: t('nav.spaces'),
      href: '/spaces',
      icon: Users,
      id: 'spaces',
    },
    {
      name: t('nav.people'),
      href: '/people',
      icon: Users,
      id: 'people',
    },
    {
      name: t('nav.tasks'),
      href: '/tasks',
      icon: Briefcase,
      id: 'tasks',
    },
    {
      name: t('nav.events'),
      href: '/events',
      icon: Calendar,
      id: 'events',
    },
  ];

  return (
    <div className="hidden md:block fixed left-0 top-0 w-60 h-screen border-r bg-background z-10">
      <div className="flex flex-col h-full p-4">
        <div className="text-2xl font-bold text-primary mb-8">Social App</div>

        <nav className="space-y-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                currentPage === item.id
                  ? 'text-primary bg-primary/10 hover:bg-primary/20'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>

          <Link
            to="/profile"
            className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
              currentPage === 'profile'
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <User className="h-5 w-5" />
            <span>{user ? user.userName : t('profile.title')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

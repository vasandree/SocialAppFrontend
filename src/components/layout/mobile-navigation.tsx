import { Users, Briefcase, Calendar, ImageIcon, User } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { routes } from '@/utils/consts/routes.ts';

interface MobileNavigationProps {
  currentPage: 'spaces' | 'people' | 'tasks' | 'events' | 'profile';
}

export const MobileNavigation = ({ currentPage }: MobileNavigationProps) => {
  const navItems = [
    {
      icon: ImageIcon,
      href: routes.spaces(),
      id: 'spaces',
    },
    {
      icon: Users,
      href: routes.people(),
      id: 'people',
    },
    {
      icon: Briefcase,
      href: routes.tasks(),
      id: 'tasks',
    },
    {
      icon: Calendar,
      href: routes.events(),
      id: 'events',
    },
    {
      icon: User,
      href: routes.profile(),
      id: 'profile',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-between p-3 md:hidden z-10">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.id}
            variant="ghost"
            size="icon"
            className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
              currentPage === item.id
                ? 'text-primary 20'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
            asChild
          >
            <Link to={item.href}>
              <Icon className="h-10 w-10" />
            </Link>
          </Button>
        );
      })}
    </div>
  );
};

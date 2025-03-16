import { Link } from 'react-router-dom';
import { Users, Briefcase, Calendar, ImageIcon, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileNavigationProps {
  currentPage: 'spaces' | 'people' | 'tasks' | 'events' | 'profile';
}

export const MobileNavigation = ({ currentPage }: MobileNavigationProps) => {
  const navItems = [
    {
      icon: ImageIcon,
      href: '/',
      id: 'home',
    },
    {
      icon: Users,
      href: '/people',
      id: 'people',
    },
    {
      icon: Briefcase,
      href: '/tasks',
      id: 'tasks',
    },
    {
      icon: Calendar,
      href: '/events',
      id: 'events',
    },
    {
      icon: User,
      href: '/profile',
      id: 'profile',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-between p-3 md:hidden z-10">
      {navItems.map((item) => (
        <Button
          key={item.id}
          variant="ghost"
          size="icon"
          className={`h-14 w-14 ${currentPage === item.id ? 'text-indigo-600' : ''}`}
          asChild
        >
          <Link to={item.href}>
            <item.icon className="h-8 w-8" />
          </Link>
        </Button>
      ))}
    </div>
  );
};

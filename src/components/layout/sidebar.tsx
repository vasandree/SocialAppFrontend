import { Users, Briefcase, Calendar, User, ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '@/utils/redux';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';

interface SidebarProps {
  currentPage: 'spaces' | 'people' | 'tasks' | 'events' | 'profile';
}

export const Sidebar = ({ currentPage }: SidebarProps) => {
  const user = useSelector((state: RootState) => state.user.value);

  const navItems = [
    {
      name: 'Рабочие пространства',
      href: '/spaces',
      icon: ImageIcon,
      id: 'spaces',
    },
    {
      name: 'Люди',
      href: '/people',
      icon: Users,
      id: 'people',
    },
    {
      name: 'Задачи',
      href: '/tasks',
      icon: Briefcase,
      id: 'tasks',
    },
    {
      name: 'События',
      href: '/events',
      icon: Calendar,
      id: 'events',
    },
  ];

  return (
    <div className="hidden md:block fixed left-0 top-0 w-70 h-screen border-r bg-white z-10">
      <div className="flex flex-col h-full p-4">
        <div className="text-2xl font-bold text-indigo-600 mb-8">Social App</div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={`flex items-center gap-2 p-2 rounded-md ${
                currentPage === item.id
                  ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <Link
          to="/profile"
          className={`mt-auto flex items-center gap-2 p-2 ${
            currentPage === 'profile'
              ? 'text-indigo-600 bg-indigo-50 rounded-md'
              : 'text-gray-500 hover:bg-gray-100 rounded-md'
          }`}
        >
          {user ? (
            <Avatar className="h-5 w-5 md:h-6 md:w-6 border-1 border-indigo-600">
              <AvatarImage
                src={user.photoUrl}
                alt={user.userName}
              />
              <AvatarFallback className="text-2xl bg-indigo-100 text-indigo-800">
                {user.firstName ? user.firstName[0] : user.userName[0]}
              </AvatarFallback>
            </Avatar>
          ) : (
            <User className="h-5 w-5" />
          )}

          <span>{user?.firstName}</span>
        </Link>
      </div>
    </div>
  );
};

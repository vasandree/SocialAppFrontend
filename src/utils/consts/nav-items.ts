import { Briefcase, Calendar, ImageIcon, User, Users } from 'lucide-react';

export const navItems = [
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

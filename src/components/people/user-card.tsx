'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  photoUrl?: string;
  email?: string;
  phone?: string;
  relationships?: string[];
  socialLinks?: {
    instagram?: string;
    github?: string;
    telegram?: string;
    vk?: string;
  };
}

interface UserCardProps {
  user: UserData;
  isSelected?: boolean;
  onClick: () => void;
}

export const UserCard = ({ user, isSelected, onClick }: UserCardProps) => {
  return (
    <Card
      className={`cursor-pointer hover:border-indigo-300 transition-colors ${isSelected ? 'border-indigo-600' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-4 flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 mb-2">
          <AvatarImage
            src={user.photoUrl}
            alt={`${user.firstName} ${user.lastName}`}
          />
          <AvatarFallback className="bg-gray-200 text-gray-400">
            {user.firstName[0]}
            {user.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <p className="font-medium">
          {user.firstName} {user.lastName}
        </p>
      </CardContent>
    </Card>
  );
};

'use client';

import { useState } from 'react';
import { Edit, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useMobile } from '@/hooks/use-mobile';
import type { UserProfile } from './types';

interface ProfileHeaderProps {
  profile: UserProfile;
}

export const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  const [copied, setCopied] = useState(false);
  const isMobile = useMobile();

  const copyId = () => {
    navigator.clipboard.writeText(profile.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fullName =
    profile.firstName && profile.lastName
      ? `${profile.firstName} ${profile.lastName}`
      : profile.firstName || profile.userName;

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
      <Avatar className="h-24 w-24 md:h-32 md:w-32 border-2 border-indigo-600">
        <AvatarImage
          src={profile.photoUrl}
          alt={fullName}
        />
        <AvatarFallback className="text-2xl bg-indigo-100 text-indigo-800">
          {profile.firstName ? profile.firstName[0] : profile.userName[0]}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-2xl md:text-3xl font-bold">{fullName}</h1>
        <p className="text-gray-500 mb-2">@{profile.userName}</p>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <span>ID: {profile.id.substring(0, 8)}...</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={copyId}
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          </Button>
        </div>

        {!isMobile && (
          <Button className="gap-2">
            <Edit className="h-4 w-4" />
            Редактировать профиль
          </Button>
        )}
      </div>

      {isMobile && (
        <div className="w-full">
          <Button className="w-full gap-2">
            <Edit className="h-4 w-4" />
            Редактировать профиль
          </Button>
        </div>
      )}
    </div>
  );
};

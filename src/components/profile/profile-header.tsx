import type { UserProfile } from './types';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileHeaderProps {
  profile: UserProfile;
}

export const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  const fullName =
    profile.firstName && profile.lastName
      ? `${profile.firstName} ${profile.lastName}`
      : profile.firstName || profile.userName;

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
      <Avatar className="h-24 w-24 md:h-32 md:w-32 border-2 border-primary">
        <AvatarImage
          src={profile.photoUrl || '/placeholder.svg'}
          alt={fullName}
        />
        <AvatarFallback className="text-2xl bg-primary/10 text-primary">
          {profile.firstName ? profile.firstName[0] : profile.userName[0]}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-2xl md:text-3xl font-bold">{fullName}</h1>
        <p className="text-muted-foreground mb-2">@{profile.userName}</p>
      </div>
    </div>
  );
};

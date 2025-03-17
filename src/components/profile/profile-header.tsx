import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserDto } from '@/utils/api';

interface ProfileHeaderProps {
  profile: UserDto;
}

export const ProfileHeader = ({ profile }: ProfileHeaderProps) => {

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

      </div>

    </div>
  );
};

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ListedBaseSocialNodeDto } from '@/utils/api';

interface UserCardProps {
  user: ListedBaseSocialNodeDto;
}

export const SocialNodeCard = ({ user }: UserCardProps) => {
  return (
    <Card className="border border-border rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200 bg-card">
      <CardContent className="p-4 flex flex-col items-center text-center bg-card">
        <Avatar className="h-24 w-24 mb-2">
          <AvatarImage
            src={user.avatarUrl || '/placeholder.svg'}
            alt={`${user.name}`}
          />
          <AvatarFallback className="bg-gray-200 text-gray-400">{user.name[0]}</AvatarFallback>
        </Avatar>
        <p className="font-medium">{user.name}</p>
      </CardContent>
    </Card>
  );
};

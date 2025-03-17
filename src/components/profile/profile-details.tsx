import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { UserDto } from '@/utils/api';

interface ProfileDetailsProps {
  profile: UserDto;
}

export const ProfileDetails = ({ profile }: ProfileDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Информация профиля
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Имя</p>
            <p className="font-medium">{profile.firstName || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Фамилия</p>
            <p className="font-medium">{profile.lastName || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Имя пользователя</p>
            <p className="font-medium">@{profile.userName}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

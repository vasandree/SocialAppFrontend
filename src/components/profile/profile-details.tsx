import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import type { UserProfile } from './types';

interface ProfileDetailsProps {
  profile: UserProfile;
}

export const ProfileDetails = ({ profile }: ProfileDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Информация профиля
          <Button
            variant="ghost"
            size="icon"
          >
            <Pencil className="h-4 w-4" />
          </Button>
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
          <div>
            <p className="text-sm text-gray-500">Telegram ID</p>
            <p className="font-medium">{profile.telegramId}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">ID</p>
            <p className="font-medium break-all">{profile.id}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

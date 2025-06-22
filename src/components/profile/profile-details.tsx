import type { UserProfile } from './types';

import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/lib/language-context';

interface ProfileDetailsProps {
  profile: UserProfile;
}

export const ProfileDetails = ({ profile }: ProfileDetailsProps) => {
  const { t } = useLanguage();

  return (
    <Card className="border border-border rounded-xl shadow-sm bg-card">
      <CardHeader className="bg-card">
        <CardTitle className="flex justify-between items-center">{t('profile.details')}</CardTitle>
      </CardHeader>
      <CardContent className="bg-card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{t('profile.firstName')}</p>
            <p className="font-medium">{profile.firstName || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t('profile.lastName')}</p>
            <p className="font-medium">{profile.lastName || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t('profile.username')}</p>
            <p className="font-medium">@{profile.userName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t('profile.telegramId')}</p>
            <p className="font-medium">{profile.telegramId}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

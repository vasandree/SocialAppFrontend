import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/lib/language-context';

export const ProfileActivity = () => {
  const { t } = useLanguage();

  return (
    <Card className="border border-border rounded-xl shadow-sm bg-card">
      <CardHeader className="bg-card">
        <CardTitle>{t('profile.activity')}</CardTitle>
      </CardHeader>
      <CardContent className="bg-card">
        <div className="flex flex-col sm:flex-row justify-between mb-4">
          <div className="text-center mb-4 sm:mb-0">
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">{t('spaces.title')}</p>
          </div>
          <div className="text-center mb-4 sm:mb-0">
            <p className="text-2xl font-bold">48</p>
            <p className="text-sm text-muted-foreground">{t('tasks.title')}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-muted-foreground">{t('events.title')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

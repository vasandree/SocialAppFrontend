import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button.tsx';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { PageLayout } from '@/components/layout/page-layout.tsx';
import { ProfileHeader } from '@/components/profile/profile-header.tsx';
import { ProfileDetails } from '@/components/profile/profile-details.tsx';
import { ProfileActivity } from '@/components/profile/profile-activity.tsx';
import { userProfileMock } from '@/lib/mock-data.ts';
import { useMobile } from '@/hooks/use-mobile.tsx';
import { ThemeToggle } from '@/components/ui/theme-toggle.tsx';
import { LanguageToggle } from '@/components/ui/language-toggle.tsx';
import { useLanguage } from '@/lib/language-context.tsx';

export const ProfilePage = () => {
  const isMobile = useMobile();
  const { t } = useLanguage();

  return (
    <PageLayout currentPage="profile">
      <div className="p-4 pb-20 md:p-8 md:pb-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          {isMobile && (
            <div className="mb-4">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1"
                asChild
              >
                <Link to="/spaces">
                  <ChevronLeft className="h-4 w-4" />
                  {t('common.back')}
                </Link>
              </Button>
            </div>
          )}

          <section className="mb-6">
            <ProfileHeader profile={userProfileMock} />
          </section>

          <Tabs
            defaultValue="details"
            className="mb-6"
          >
            <TabsList className="w-full">
              <TabsTrigger
                value="details"
                className="flex-1"
              >
                {t('profile.details')}
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="flex-1"
              >
                {t('profile.activity')}
              </TabsTrigger>
              {isMobile && (
                <TabsTrigger
                  value="settings"
                  className="flex-1"
                >
                  {t('profile.settings')}
                </TabsTrigger>
              )}
            </TabsList>
            <TabsContent
              value="details"
              className="mt-4"
            >
              <ProfileDetails profile={userProfileMock} />
            </TabsContent>
            <TabsContent
              value="activity"
              className="mt-4"
            >
              <ProfileActivity />
            </TabsContent>
            {isMobile && (
              <TabsContent
                value="settings"
                className="mt-4"
              >
                <Card className="border border-border rounded-xl shadow-sm bg-card">
                  <CardHeader className="bg-card">
                    <CardTitle>{t('profile.settings')}</CardTitle>
                  </CardHeader>
                  <CardContent className="bg-card space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-3">{t('settings.theme')}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{t('settings.theme.description')}</span>
                          <ThemeToggle />
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h3 className="text-sm font-medium mb-3">{t('settings.language')}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{t('settings.language.description')}</span>
                          <LanguageToggle />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

import { ChevronLeft, Link } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { useMobile } from '@/hooks/use-mobile.tsx';
import { MobileNavigation } from '@/components/layout/mobile-navigation.tsx';
import { ProfileDetails } from '@/components/profile/profile-details.tsx';
import { ProfileActivity } from '@/components/profile/profile-activity.tsx';
import { ProfileHeader } from '@/components/profile/profile-header.tsx';
import { Sidebar } from '@/components/layout/sidebar.tsx';

interface UserProfile {
  id: string;
  telegramId: number;
  firstName?: string;
  lastName?: string;
  userName: string;
  photoUrl?: string;
}

// Mock data based on the provided model
const userProfileMock: UserProfile = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  telegramId: 123456789,
  firstName: 'Андрей',
  lastName: 'Петров',
  userName: 'andrey_petrov',
  photoUrl: '/placeholder.svg?height=300&width=300',
};

export const ProfilePage = () => {
  const isMobile = useMobile();

  return (
    <div className="flex h-full">
      <Sidebar currentPage={'profile'} />

      <main className="flex-1 p-4 pb-20 md:p-8 md:pb-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          {isMobile && (
            <div className="mb-4">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1"
                asChild
              >
                <Link href="/spaces">
                  <ChevronLeft className="h-4 w-4" />
                  Назад
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
                Детали
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="flex-1"
              >
                Активность
              </TabsTrigger>
              <TabsTrigger
                value="spaces"
                className="flex-1"
              >
                Пространства
              </TabsTrigger>
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
            <TabsContent
              value="spaces"
              className="mt-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Мои пространства</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Здесь будут отображаться ваши пространства</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <MobileNavigation currentPage={'profile'} />
    </div>
  );
};

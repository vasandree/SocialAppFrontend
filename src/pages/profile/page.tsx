import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

import { ProfileActivity, ProfileDetails, ProfileHeader } from '@/components/profile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RootState } from '@/utils/redux';
import { PageLayout } from '@/components/layout';
import { Button } from '@/components/ui/button.tsx';
import { routes } from '@/utils/consts/routes.ts';

const Profile = () => {
  const user = useSelector((state: RootState) => state.user.value);

  return (
    <div className="flex h-full">
      <main className="flex-1 p-4 pb-20 md:p-8 md:pb-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-end mb-6">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-accent transition-colors"
              asChild
            >
              <Link to={routes.settings()}>
                <Settings className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          <section className="mb-6">{user && <ProfileHeader profile={user} />}</section>

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
            </TabsList>
            <TabsContent
              value="details"
              className="mt-4"
            >
              {user && <ProfileDetails profile={user} />}
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
            />
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export const ProfilePage = () => {
  return (
    <PageLayout currentPage="profile">
      <Profile />
    </PageLayout>
  );
};

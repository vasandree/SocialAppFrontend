import { useSelector } from 'react-redux';

import { MobileNavigation, Sidebar } from '@/components/layout';
import { ProfileActivity, ProfileDetails, ProfileHeader } from '@/components/profile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RootState } from '@/utils/redux';

export const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.user.value);

  return (
    <div className="flex h-full">
      <Sidebar currentPage="profile" />

      <main className="flex-1 p-4 pb-20 md:p-8 md:pb-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
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

      <MobileNavigation currentPage="profile" />
    </div>
  );
};

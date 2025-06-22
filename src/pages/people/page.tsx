import { useState } from 'react';
import { Search, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { PageLayout } from '@/components/layout/page-layout.tsx';
import { UserCard, UserData } from '@/components/people/user-card.tsx';
import { UserDetailPanel } from '@/components/people/user-detail-panel.tsx';
import { PersonCreationDialog } from '@/components/people/person-creation-dialog.tsx';
import { usersMock } from '@/lib/mock-data.ts';
import { useMobile } from '@/hooks/use-mobile.tsx';
import { useLanguage } from '@/lib/language-context.tsx';

const MobileView = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { t } = useLanguage();

  return (
    <div className="p-4 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">{t('people.title')}</h1>
        <PersonCreationDialog>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </PersonCreationDialog>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {usersMock.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onClick={() => setSelectedUser(user)}
          />
        ))}
      </div>

      {selectedUser && (
        <UserDetailPanel
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

const DesktopView = () => {
  const [selectedUser, setSelectedUser] = useState<UserData>();
  const { t } = useLanguage();

  return (
    <div className="flex h-full">
      <div className="flex-1 p-4 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t('common.search')}
                className="pl-8 w-full"
              />
            </div>
            <PersonCreationDialog>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                {t('common.add')}
              </Button>
            </PersonCreationDialog>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {usersMock.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                isSelected={selectedUser.id === user.id}
                onClick={() => setSelectedUser(user)}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedUser && (
        <UserDetailPanel
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export const PeoplePage = () => {
  const isMobile = useMobile();

  return <PageLayout currentPage="people">{isMobile ? <MobileView /> : <DesktopView />}</PageLayout>;
};

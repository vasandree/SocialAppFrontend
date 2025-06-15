import { useState } from 'react';
import { Search, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useMobile } from '@/hooks/use-mobile.tsx';
import { UserCard } from '@/components/people/user-card.tsx';
import { UserDetailPanel } from '@/components/people/user-detail-panel.tsx';
import { Sidebar } from '@/components/layout/sidebar.tsx';
import { MobileNavigation } from '@/components/layout/mobile-navigation.tsx';
import { usersMock } from '@/lib/mock-data.ts';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  photoUrl?: string;
  email?: string;
  phone?: string;
  relationships?: string[];
  socialLinks?: {
    instagram?: string;
    github?: string;
    telegram?: string;
    vk?: string;
  };
}

const MobileView = ({ users }: { users: UserData[] }) => {
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  if (selectedUser) {
    return (
      <div className="h-full pb-16">
        <UserDetailPanel
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      </div>
    );
  }

  return (
    <div className="p-4 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-600">Персоны</h1>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onClick={() => setSelectedUser(user)}
          />
        ))}
      </div>
    </div>
  );
};

const DesktopView = ({ users }: { users: UserData[] }) => {
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  return (
    <div className="flex h-full">
      <div className="flex-1 p-4 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Поиск"
                className="pl-8 w-full"
              />
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Добавить
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                isSelected={selectedUser?.id === user.id}
                onClick={() => setSelectedUser(user)}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedUser && (
        <div className="w-80 border-l overflow-auto">
          <UserDetailPanel
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        </div>
      )}
    </div>
  );
};

export const PeoplePage = () => {
  const isMobile = useMobile();

  return (
    <div className="flex h-full">
      <Sidebar currentPage="people" />

      <main className="flex-1 h-full overflow-hidden">
        {isMobile ? <MobileView users={usersMock} /> : <DesktopView users={usersMock} />}
      </main>

      <MobileNavigation currentPage="people" />
    </div>
  );
};

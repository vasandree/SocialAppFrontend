import { useMobile } from '@/hooks/use-mobile.tsx';
import { Sidebar } from '@/components/layout/sidebar.tsx';
import { SectionHeader } from '@/components/spaces/section-header.tsx';
import { SpaceCard } from '@/components/spaces/space-card.tsx';
import { MobileNavigation } from '@/components/layout/mobile-navigation.tsx';

interface SpaceProps {
  title: string;
  description: string;
  usersCount: number;
  tasksCount: number;
  eventsCount: number;
}

const spacesMock: SpaceProps[] = [
  {
    title: 'Название',
    description:
      'Описание описание описание описание описание описание описание описание описание описание описание описание',
    usersCount: 4,
    tasksCount: 4,
    eventsCount: 4,
  },
  {
    title: 'Название',
    description:
      'Описание описание описание описание описание описание описание описание описание описание описание описание',
    usersCount: 4,
    tasksCount: 4,
    eventsCount: 4,
  },
];

const availableSpacesMock: SpaceProps[] = [
  {
    title: 'Название',
    description:
      'Описание описание описание описание описание описание описание описание описание описание описание описание',
    usersCount: 4,
    tasksCount: 4,
    eventsCount: 4,
  },
  {
    title: 'Название',
    description:
      'Описание описание описание описание описание описание описание описание описание описание описание описание',
    usersCount: 4,
    tasksCount: 4,
    eventsCount: 4,
  },
  {
    title: 'Название',
    description:
      'Описание описание описание описание описание описание описание описание описание описание описание описание',
    usersCount: 4,
    tasksCount: 4,
    eventsCount: 4,
  },
];

export const SpacesPage = () => {
  const isMobile = useMobile();

  return (
    <div className="flex h-full">
      <Sidebar currentPage={'spaces'} />

      <main className="flex-1 p-4 pb-20 md:p-8 md:pb-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <section className="mb-10">
            <SectionHeader title="Мои пространства" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {spacesMock.map((space, index) => (
                <SpaceCard
                  key={index}
                  space={space}
                />
              ))}
            </div>
          </section>

          <section>
            <SectionHeader
              title="Доступные пространства"
              showViewAll
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableSpacesMock.map((space, index) => (
                <SpaceCard
                  key={index}
                  space={space}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <MobileNavigation currentPage={'spaces'} />
    </div>
  );
};

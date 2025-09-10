import { Search, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { PageLayout } from '@/components/layout/page-layout.tsx';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ClustersDto, PersonsPaginatedDto, PlacesDto } from '@/utils/api';
import { PersonCreationDialog, SocialNodeCard } from '@/components/people';
import { EmptyPlaceholder } from '@/components/ui/empty-placeholder';
import { useLanguage } from '@/app/language-context';
import { useMobile } from '@/hooks/use-mobile.tsx';
import { useGetClusters, useGetPersons, useGetPlaces } from '@/utils/api/hooks';
import { routes } from '@/utils/consts/routes.ts';

const PersonsTab = ({
  navigate,
  persons,
  loading,
  pagination,
  onPageChange,
  search,
  onSearch,
  showSearch = true,
}: {
  navigate: NavigateFunction;
  persons: PersonsPaginatedDto;
  loading: boolean;
  pagination: { current: number; count: number; size: number };
  onPageChange: (page: number) => void;
  search: string;
  onSearch: (value: string) => void;
  showSearch?: boolean;
}) => {
  const { t } = useLanguage();
  return (
    <>
      {showSearch && (
        <Input
          type="search"
          placeholder={t('common.search')}
          className="mb-2"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {loading ? (
          <div>{t('common.loading')}</div>
        ) : Array.isArray(persons?.person) && persons.person.length > 0 ? (
          persons.person.map((person) => (
            <SocialNodeCard
              key={person.id}
              user={person}
              onClick={() => navigate(routes.person(person.id))}
            />
          ))
        ) : (
          <div className="col-span-2 md:col-span-3 flex items-center justify-center min-h-[300px]">
            <EmptyPlaceholder description="Список пуст" />
          </div>
        )}
      </div>
      {pagination.count > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: pagination.count }, (_, i) => (
            <Button
              key={i + 1}
              size="sm"
              variant={pagination.current === i + 1 ? 'default' : 'outline'}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};

const PlacesTab = ({
  navigate,
  places,
  loading,
  pagination,
  onPageChange,
  search,
  onSearch,
  showSearch = true,
}: {
  navigate: NavigateFunction;
  places: PlacesDto;
  loading: boolean;
  pagination: { current: number; count: number; size: number };
  onPageChange: (page: number) => void;
  search: string;
  onSearch: (value: string) => void;
  showSearch?: boolean;
}) => {
  const { t } = useLanguage();
  return (
    <>
      {showSearch && (
        <Input
          type="search"
          placeholder={t('common.search')}
          className="mb-2"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {loading ? (
          <div>{t('common.loading')}</div>
        ) : Array.isArray(places?.place) && places.place.length > 0 ? (
          places.place.map((place) => (
            <SocialNodeCard
              key={place.id}
              user={place}
              onClick={() => navigate(routes.place(place.id))}
            />
          ))
        ) : (
          <div className="col-span-2 md:col-span-3 flex items-center justify-center min-h-[300px]">
            <EmptyPlaceholder description="Список пуст" />
          </div>
        )}
      </div>
      {pagination.count > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: pagination.count }, (_, i) => (
            <Button
              key={i + 1}
              size="sm"
              variant={pagination.current === i + 1 ? 'default' : 'outline'}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};

const ClustersTab = ({
  navigate,
  clusters,
  loading,
  pagination,
  onPageChange,
  search,
  onSearch,
  showSearch = true,
}: {
  navigate: NavigateFunction;
  clusters: ClustersDto;
  loading: boolean;
  pagination: { current: number; count: number; size: number };
  onPageChange: (page: number) => void;
  search: string;
  onSearch: (value: string) => void;
  showSearch?: boolean;
}) => {
  const { t } = useLanguage();
  return (
    <>
      {showSearch && (
        <Input
          type="search"
          placeholder={t('common.search')}
          className="mb-2"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {loading ? (
          <div>{t('common.loading')}</div>
        ) : Array.isArray(clusters?.clusters) && clusters.clusters.length > 0 ? (
          clusters.clusters.map((cluster) => (
            <SocialNodeCard
              key={cluster.id}
              user={cluster}
              onClick={() => navigate(routes.cluster(cluster.id))}
            />
          ))
        ) : (
          <div className="col-span-2 md:col-span-3 flex items-center justify-center min-h-[300px]">
            <EmptyPlaceholder description="Список пуст" />
          </div>
        )}
      </div>
      {pagination.count > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: pagination.count }, (_, i) => (
            <Button
              key={i + 1}
              size="sm"
              variant={pagination.current === i + 1 ? 'default' : 'outline'}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};

const MobileView = ({
  navigate,
  persons,
  places,
  clusters,
  loading,
  onPersonsPageChange,
  personsPagination,
  onPersonsSearch,
  personsSearch,
  onPlacesPageChange,
  placesPagination,
  onPlacesSearch,
  placesSearch,
  onClustersPageChange,
  clustersPagination,
  onClustersSearch,
  clustersSearch,
  onTabChange,
  tab,
}: {
  navigate: NavigateFunction;
  persons: PersonsPaginatedDto;
  places: PlacesDto;
  clusters: ClustersDto;
  loading: boolean;
  onPersonsPageChange: (page: number) => void;
  personsPagination: { current: number; count: number; size: number };
  onPersonsSearch: (value: string) => void;
  personsSearch: string;
  onPlacesPageChange: (page: number) => void;
  placesPagination: { current: number; count: number; size: number };
  onPlacesSearch: (value: string) => void;
  placesSearch: string;
  onClustersPageChange: (page: number) => void;
  clustersPagination: { current: number; count: number; size: number };
  onClustersSearch: (value: string) => void;
  clustersSearch: string;
  onTabChange: (tab: string) => void;
  tab: string;
}) => {
  const { t } = useLanguage();

  return (
    <div className="p-4 pb-28">
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
      <Tabs
        value={tab}
        onValueChange={onTabChange}
        className="w-full"
      >
        <TabsList className="mb-4 w-full grid grid-cols-3">
          <TabsTrigger
            className="flex-1"
            value="persons"
          >
            {t('people.title')}
          </TabsTrigger>
          <TabsTrigger
            className="flex-1"
            value="places"
          >
            {t('places.title')}
          </TabsTrigger>
          <TabsTrigger
            className="flex-1"
            value="clusters"
          >
            {t('clusters.title')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="persons">
          <PersonsTab
            navigate={navigate}
            persons={persons}
            loading={loading}
            pagination={personsPagination}
            onPageChange={onPersonsPageChange}
            search={personsSearch}
            onSearch={onPersonsSearch}
          />
        </TabsContent>
        <TabsContent value="places">
          <PlacesTab
            navigate={navigate}
            places={places}
            loading={loading}
            pagination={placesPagination}
            onPageChange={onPlacesPageChange}
            search={placesSearch}
            onSearch={onPlacesSearch}
          />
        </TabsContent>
        <TabsContent value="clusters">
          <ClustersTab
            navigate={navigate}
            clusters={clusters}
            loading={loading}
            pagination={clustersPagination}
            onPageChange={onClustersPageChange}
            search={clustersSearch}
            onSearch={onClustersSearch}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const DesktopView = ({
  navigate,
  persons,
  places,
  clusters,
  loading,
  onPersonsPageChange,
  personsPagination,
  onPersonsSearch,
  personsSearch,
  onPlacesPageChange,
  placesPagination,
  onPlacesSearch,
  placesSearch,
  onClustersPageChange,
  clustersPagination,
  onClustersSearch,
  clustersSearch,
  onTabChange,
  tab,
}: {
  navigate: NavigateFunction;
  persons: PersonsPaginatedDto;
  places: PlacesDto;
  clusters: ClustersDto;
  loading: boolean;
  onPersonsPageChange: (page: number) => void;
  personsPagination: { current: number; count: number; size: number };
  onPersonsSearch: (value: string) => void;
  personsSearch: string;
  onPlacesPageChange: (page: number) => void;
  placesPagination: { current: number; count: number; size: number };
  onPlacesSearch: (value: string) => void;
  placesSearch: string;
  onClustersPageChange: (page: number) => void;
  clustersPagination: { current: number; count: number; size: number };
  onClustersSearch: (value: string) => void;
  clustersSearch: string;
  onTabChange: (tab: string) => void;
  tab: string;
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex h-full pb-8">
      <div className="flex-1 p-4 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t('common.search')}
                className="pl-8 w-full"
                value={tab === 'persons' ? personsSearch : tab === 'places' ? placesSearch : clustersSearch}
                onChange={(e) => {
                  if (tab === 'persons') onPersonsSearch(e.target.value);
                  else if (tab === 'places') onPlacesSearch(e.target.value);
                  else onClustersSearch(e.target.value);
                }}
              />
            </div>
            <PersonCreationDialog>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                {t('common.add')}
              </Button>
            </PersonCreationDialog>
          </div>
          <Tabs
            value={tab}
            onValueChange={onTabChange}
            className="w-full"
          >
            <TabsList className="mb- w-full grid grid-cols-3">
              <TabsTrigger value="persons">{t('people.title')}</TabsTrigger>
              <TabsTrigger value="places">{t('places.title')}</TabsTrigger>
              <TabsTrigger value="clusters">{t('clusters.title')}</TabsTrigger>
            </TabsList>
            <TabsContent value="persons">
              <PersonsTab
                navigate={navigate}
                persons={persons}
                loading={loading}
                pagination={personsPagination}
                onPageChange={onPersonsPageChange}
                search={personsSearch}
                onSearch={onPersonsSearch}
                showSearch={false}
              />
            </TabsContent>
            <TabsContent value="places">
              <PlacesTab
                navigate={navigate}
                places={places}
                loading={loading}
                pagination={placesPagination}
                onPageChange={onPlacesPageChange}
                search={placesSearch}
                onSearch={onPlacesSearch}
                showSearch={false}
              />
            </TabsContent>
            <TabsContent value="clusters">
              <ClustersTab
                navigate={navigate}
                clusters={clusters}
                loading={loading}
                pagination={clustersPagination}
                onPageChange={onClustersPageChange}
                search={clustersSearch}
                onSearch={onClustersSearch}
                showSearch={false}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export const PeoplePage = () => {
  const isMobile = useMobile();

  const navigate = useNavigate();
  const [tab, setTab] = useState<'persons' | 'places' | 'clusters'>('persons');
  const [personsPage, setPersonsPage] = useState(1);
  const [personsSearch, setPersonsSearch] = useState('');
  const [placesPage, setPlacesPage] = useState(1);
  const [placesSearch, setPlacesSearch] = useState('');
  const [clustersPage, setClustersPage] = useState(1);
  const [clustersSearch, setClustersSearch] = useState('');

  const handleTabChange = (newTab: string) => {
    setTab(newTab as typeof tab);
    if (newTab === 'persons') {
      setPersonsPage(1);
      setPersonsSearch('');
    }
    if (newTab === 'places') {
      setPlacesPage(1);
      setPlacesSearch('');
    }
    if (newTab === 'clusters') {
      setClustersPage(1);
      setClustersSearch('');
    }
  };

  const {
    data: persons,
    isLoading: loadingPersons,
    refetch: refetchPersons,
  } = useGetPersons({
    queryParams: {
      page: personsPage,
      searchTerm: personsSearch,
    },
  });
  const {
    data: places,
    isLoading: loadingPlaces,
    refetch: refetchPlaces,
  } = useGetPlaces({
    queryParams: {
      page: placesPage,
      searchTerm: placesSearch,
    },
  });
  const {
    data: clusters,
    isLoading: loadingClusters,
    refetch: refetchClusters,
  } = useGetClusters({
    queryParams: {
      page: clustersPage,
      searchTerm: clustersSearch,
    },
  });

  const loading = loadingPersons || loadingPlaces || loadingClusters;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPersonsPage(1);
      if (tab === 'persons') refetchPersons();
    }, 400);
    return () => clearTimeout(timeout);
  }, [personsSearch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPlacesPage(1);
      if (tab === 'places') refetchPlaces();
    }, 400);
    return () => clearTimeout(timeout);
  }, [placesSearch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setClustersPage(1);
      if (tab === 'clusters') refetchClusters();
    }, 400);
    return () => clearTimeout(timeout);
  }, [clustersSearch]);

  useEffect(() => {
    if (tab === 'persons') refetchPersons();
    if (tab === 'places') refetchPlaces();
    if (tab === 'clusters') refetchClusters();
  }, [tab]);

  const personsPagination = {
    current: persons?.pagination?.current || 1,
    count: persons?.pagination?.count || 1,
    size: persons?.pagination?.size || 20,
  };
  const placesPagination = {
    current: places?.pagination?.current || 1,
    count: places?.pagination?.count || 1,
    size: places?.pagination?.size || 20,
  };
  const clustersPagination = {
    current: clusters?.pagination?.current || 1,
    count: clusters?.pagination?.count || 1,
    size: clusters?.pagination?.size || 20,
  };

  return (
    <PageLayout currentPage="people">
      {isMobile ? (
        <MobileView
          navigate={navigate}
          persons={persons}
          places={places}
          clusters={clusters}
          loading={loading}
          onPersonsPageChange={setPersonsPage}
          personsPagination={personsPagination}
          onPersonsSearch={setPersonsSearch}
          personsSearch={personsSearch}
          onPlacesPageChange={setPlacesPage}
          placesPagination={placesPagination}
          onPlacesSearch={setPlacesSearch}
          placesSearch={placesSearch}
          onClustersPageChange={setClustersPage}
          clustersPagination={clustersPagination}
          onClustersSearch={setClustersSearch}
          clustersSearch={clustersSearch}
          onTabChange={handleTabChange}
          tab={tab}
        />
      ) : (
        <DesktopView
          navigate={navigate}
          persons={persons}
          places={places}
          clusters={clusters}
          loading={loading}
          onPersonsPageChange={setPersonsPage}
          personsPagination={personsPagination}
          onPersonsSearch={setPersonsSearch}
          personsSearch={personsSearch}
          onPlacesPageChange={setPlacesPage}
          placesPagination={placesPagination}
          onPlacesSearch={setPlacesSearch}
          placesSearch={placesSearch}
          onClustersPageChange={setClustersPage}
          clustersPagination={clustersPagination}
          onClustersSearch={setClustersSearch}
          clustersSearch={clustersSearch}
          onTabChange={handleTabChange}
          tab={tab}
        />
      )}
    </PageLayout>
  );
};

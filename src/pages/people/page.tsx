import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MobileView } from './components/MobileView';
import { DesktopView } from './components/DesktopView';

import { PageLayout } from '@/components/layout/page-layout.tsx';
import { useMobile } from '@/hooks/use-mobile.tsx';
import { useGetClusters, useGetPersons, useGetPlaces } from '@/utils/api/hooks';

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

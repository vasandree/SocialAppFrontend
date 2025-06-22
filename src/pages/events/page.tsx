import { useState } from 'react';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';
import { PageLayout } from '@/components/layout/page-layout.tsx';
import { EventSection } from '@/components/events/event-section.tsx';
import { EventDetailPanel } from '@/components/events/event-detail-panel.tsx';
import { eventsMock } from '@/lib/mock-data.ts';
import { useMobile } from '@/hooks/use-mobile.tsx';
import { useLanguage } from '@/lib/language-context.tsx';

const EmptyState = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center py-20 bg-muted/50 rounded-lg">
      <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-2 text-lg font-medium">{t('events.title')}</h3>
      <p className="mt-1 text-sm text-muted-foreground">No events found yet.</p>
    </div>
  );
};

const MobileEventsView = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { t } = useLanguage();

  if (selectedEvent) {
    return (
      <div className="h-full pb-20">
        <EventDetailPanel
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      </div>
    );
  }

  const todayEvents = eventsMock.filter((event) => event.singleDate === '1.01.2024');
  const thisWeekEvents = eventsMock.filter(
    (event) => event.singleDate === '1.01.2024' || event.singleDate === '1.01.2024-7.01.2024'
  );
  const thisMonthEvents = eventsMock.filter((event) => event.singleDate === '1.01.2024');
  const thisYearEvents = eventsMock.filter((event) => event.singleDate === '1.01.2024');
  const allEvents = [todayEvents, thisWeekEvents, thisMonthEvents, thisYearEvents].flat();

  return (
    <div className="p-4 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">{t('events.title')}</h1>
      </div>

      {allEvents.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <EventSection
            title={`${t('events.today')}, 1 января 2024`}
            events={todayEvents}
            onEventClick={setSelectedEvent}
          />
          <EventSection
            title={`${t('events.thisWeek')}, 1.01.2024-7.01.2024`}
            events={thisWeekEvents}
            onEventClick={setSelectedEvent}
          />
          <EventSection
            title={`${t('events.thisMonth')}, январь 2024`}
            events={thisMonthEvents}
            onEventClick={setSelectedEvent}
          />
          <EventSection
            title={`${t('events.thisYear')}, 2024`}
            events={thisYearEvents}
            onEventClick={setSelectedEvent}
          />
        </>
      )}
    </div>
  );
};

const DesktopEventsView = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [yearSelector, setYearSelector] = useState('2024');
  const { t } = useLanguage();

  const todayEvents = eventsMock.filter((event) => event.singleDate === '1.01.2024');
  const thisWeekEvents = eventsMock.filter(
    (event) => event.singleDate === '1.01.2024' || event.singleDate === '1.01.2024-7.01.2024'
  );
  const thisMonthEvents = eventsMock.filter((event) => event.singleDate === '1.01.2024');
  const thisYearEvents = eventsMock.filter((event) => event.singleDate === '1.01.2024');
  const allEvents = [todayEvents, thisWeekEvents, thisMonthEvents, thisYearEvents].flat();

  return (
    <div className="flex h-full">
      <div className="flex-1 p-6 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">{t('events.title')}</h1>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <CalendarIcon className="h-4 w-4" />
                {yearSelector} <span className="sr-only">Year</span>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </div>

          {allEvents.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <EventSection
                title={`${t('events.today')}, 1 января 2024`}
                events={todayEvents}
                onEventClick={setSelectedEvent}
              />
              <EventSection
                title={`${t('events.thisWeek')}, 1.01.2024-7.01.2024`}
                events={thisWeekEvents}
                onEventClick={setSelectedEvent}
              />
              <EventSection
                title={`${t('events.thisMonth')}, январь 2024`}
                events={thisMonthEvents}
                onEventClick={setSelectedEvent}
              />
              <EventSection
                title={`${t('events.thisYear')}, 2024`}
                events={thisYearEvents}
                onEventClick={setSelectedEvent}
              />
            </>
          )}
        </div>
      </div>

      {selectedEvent && (
        <EventDetailPanel
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export const EventsPage = () => {
  const isMobile = useMobile();

  return <PageLayout currentPage="events">{isMobile ? <MobileEventsView /> : <DesktopEventsView />}</PageLayout>;
};

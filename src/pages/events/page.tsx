import { useState } from 'react';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';
import { PageLayout } from '@/components/layout/page-layout.tsx';
import { EventSection } from '@/components/events/event-section.tsx';
import { EventDetailPanel } from '@/components/events/event-detail-panel.tsx';
import { useMobile } from '@/hooks/use-mobile.tsx';
import { useLanguage } from '@/app/language-context.tsx';
import { useGetEvents } from '@/utils/api/hooks/Events/useGetEvents';
import { ListedEventDto } from '@/utils/api';

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

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isSameWeek(date: Date, now: Date) {
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  return date >= startOfWeek && date <= endOfWeek;
}

function isSameMonth(date: Date, now: Date) {
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
}

function isSameYear(date: Date, now: Date) {
  return date.getFullYear() === now.getFullYear();
}

function useParsedEvents(events: ListedEventDto[] | undefined) {
  const now = new Date();
  const parsedEvents = (events || []).map((e) => ({
    ...e,
    date: new Date(e.date),
  }));

  const todayEvents = parsedEvents.filter((event) => isSameDay(event.date, now));
  const thisWeekEvents = parsedEvents.filter((event) => isSameWeek(event.date, now));
  const thisMonthEvents = parsedEvents.filter((event) => isSameMonth(event.date, now));
  const thisYearEvents = parsedEvents.filter((event) => isSameYear(event.date, now));

  return {
    parsedEvents,
    todayEvents,
    thisWeekEvents,
    thisMonthEvents,
    thisYearEvents,
  };
}

const MobileEventsView = () => {
  const { t } = useLanguage();
  const { data: events, isLoading } = useGetEvents({});

  const { parsedEvents, todayEvents, thisWeekEvents, thisMonthEvents, thisYearEvents } = useParsedEvents(events);

  return (
    <div className="p-4 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">{t('events.title')}</h1>
      </div>

      {isLoading ? (
        <div className="text-center py-20">{t('common.loading')}</div>
      ) : parsedEvents.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <EventSection
            title={t('events.today')}
            events={todayEvents}
          />
          <EventSection
            title={t('events.thisWeek')}
            events={thisWeekEvents}
          />
          <EventSection
            title={t('events.thisMonth')}
            events={thisMonthEvents}
          />
          <EventSection
            title={t('events.thisYear')}
            events={thisYearEvents}
          />
        </>
      )}
    </div>
  );
};

const DesktopEventsView = () => {
  const [selectedEvent, setSelectedEvent] = useState<ListedEventDto | null>(null);
  const [yearSelector] = useState(new Date().getFullYear().toString());
  const { t } = useLanguage();
  const { data: events, isLoading } = useGetEvents({});

  const { parsedEvents, todayEvents, thisWeekEvents, thisMonthEvents, thisYearEvents } = useParsedEvents(events);

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

          {isLoading ? (
            <div className="text-center py-20">{t('common.loading')}</div>
          ) : parsedEvents.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <EventSection
                title={t('events.today')}
                events={todayEvents}
              />
              <EventSection
                title={t('events.thisWeek')}
                events={thisWeekEvents}
              />
              <EventSection
                title={t('events.thisMonth')}
                events={thisMonthEvents}
              />
              <EventSection
                title={t('events.thisYear')}
                events={thisYearEvents}
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

import { useState } from 'react';
import { Plus, CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/layout/page-layout';
import { EventSection } from '@/components/events/event-section';
import { EventDetailPanel } from '@/components/events/event-detail-panel';
import { EventFormDialog } from '@/components/events/event-form-dialog';
import { eventsMock } from '@/lib/mock-data';
import { useMobile } from '@/hooks/use-mobile';

const MobileEventsView = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

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
    (event) => event.singleDate === '1.01.2024' || event.singleDate === '1.01.2024-7.01.2024',
  );
  const thisMonthEvents = eventsMock.filter((event) => event.singleDate === '1.01.2024');
  const thisYearEvents = eventsMock.filter((event) => event.singleDate === '1.01.2024');

  return (
    <div className="p-4 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-600">События</h1>
        <EventFormDialog>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </EventFormDialog>
      </div>

      <EventSection
        title="Сегодня, 1 января 2024"
        events={todayEvents}
        onEventClick={setSelectedEvent}
      />

      <EventSection
        title="На этой неделе, 1.01.2024-7.01.2024"
        events={thisWeekEvents}
        onEventClick={setSelectedEvent}
      />

      <EventSection
        title="В этом месяце, январь 2024"
        events={thisMonthEvents}
        onEventClick={setSelectedEvent}
      />

      <EventSection
        title="В этом году, 2024"
        events={thisYearEvents}
        onEventClick={setSelectedEvent}
      />

      <EventFormDialog>
        <Button
          className="fixed right-4 bottom-24 rounded-full h-14 w-14 shadow-lg"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </EventFormDialog>
    </div>
  );
};

const DesktopEventsView = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [yearSelector, setYearSelector] = useState('2024');

  const todayEvents = eventsMock.filter((event) => event.singleDate === '1.01.2024');
  const thisWeekEvents = eventsMock.filter(
    (event) => event.singleDate === '1.01.2024' || event.singleDate === '1.01.2024-7.01.2024',
  );
  const thisMonthEvents = eventsMock.filter((event) => event.singleDate === '1.01.2024');
  const thisYearEvents = eventsMock.filter((event) => event.singleDate === '1.01.2024');

  return (
    <div className="flex h-full">
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">События</h1>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <CalendarIcon className="h-4 w-4" />
                {yearSelector} <span className="sr-only">Год</span>
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
            <EventFormDialog>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Новое событие
              </Button>
            </EventFormDialog>
          </div>

          <EventSection
            title="Сегодня, 1 января 2024"
            events={todayEvents}
            onEventClick={setSelectedEvent}
          />

          <EventSection
            title="На этой неделе, 1.01.2024-7.01.2024"
            events={thisWeekEvents}
            onEventClick={setSelectedEvent}
          />

          <EventSection
            title="В этом месяце, январь 2024"
            events={thisMonthEvents}
            onEventClick={setSelectedEvent}
          />

          <EventSection
            title="В этом году, 2024"
            events={thisYearEvents}
            onEventClick={setSelectedEvent}
          />
        </div>
      </div>

      {selectedEvent && (
        <div className="w-96 border-l overflow-auto">
          <EventDetailPanel
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        </div>
      )}
    </div>
  );
};

export const EventsPage = () => {
  const isMobile = useMobile();

  return <PageLayout currentPage="events">{isMobile ? <MobileEventsView /> : <DesktopEventsView />}</PageLayout>;
};

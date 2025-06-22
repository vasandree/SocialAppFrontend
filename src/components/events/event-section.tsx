import { EventCard, type EventData } from './event-card';

interface EventSectionProps {
  title: string;
  events: EventData[];
  onEventClick: (event: EventData) => void;
}

export const EventSection = ({ title, events, onEventClick }: EventSectionProps) => {
  if (events.length === 0) {
    return null;
  }

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={() => onEventClick(event)}
          />
        ))}
      </div>
    </section>
  );
};

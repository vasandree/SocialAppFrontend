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
    <section className="mb-8">
      <h2 className="text-xl font-bold text-indigo-600 mb-4">{title}</h2>
      <div>
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

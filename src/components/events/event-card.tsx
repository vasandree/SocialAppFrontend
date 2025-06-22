import { MapPin, Info, Calendar } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface EventData {
  id: string;
  title: string;
  description: string;
  dateRange: string;
  singleDate?: string;
  location?: string;
  participants?: {
    name: string;
    photoUrl?: string;
  }[];
  type?: string;
}

export const EventCard = ({ event, onClick }: { event: EventData; onClick?: () => void }) => {
  return (
    <Card
      className="relative overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer rounded-xl bg-card"
      onClick={onClick}
    >
      <div className="absolute left-0 top-0 h-full w-1.5 bg-primary" />
      <CardContent className="p-4 pl-6 bg-card">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
          {event.singleDate && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{event.singleDate}</span>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{event.description}</p>

        <div className="flex flex-col space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>{event.dateRange}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{event.location}</span>
            </div>
          )}
          {event.type && (
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-gray-400" />
              <span>{event.type}</span>
            </div>
          )}
        </div>

        {event.participants && event.participants.length > 0 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex -space-x-2">
              {event.participants.slice(0, 5).map((participant, i) => (
                <Avatar
                  key={i}
                  className="h-8 w-8 border-2 border-white"
                >
                  <AvatarImage
                    src={participant.photoUrl || '/placeholder.svg'}
                    alt={participant.name}
                  />
                  <AvatarFallback className="text-xs">{participant.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            {event.participants.length > 5 && (
              <span className="text-xs text-gray-500 ml-2">+{event.participants.length - 5} еще</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

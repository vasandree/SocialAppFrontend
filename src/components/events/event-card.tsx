import { MapPin, Info } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface EventData {
  id: string;
  title: string;
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
      className="mb-3 cursor-pointer hover:border-indigo-300 transition-colors"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-medium mb-2">{event.title}</h3>
          {event.singleDate && <span className="text-sm text-gray-500">{event.singleDate}</span>}
        </div>

        <div className="flex gap-4 text-gray-500 text-sm">
          {event.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          )}

          {event.type && (
            <div className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              <span>{event.type}</span>
            </div>
          )}
        </div>

        {event.participants && event.participants.length > 0 && (
          <div className="flex items-center mt-3">
            <div className="flex -space-x-2">
              {event.participants.slice(0, 3).map((participant, i) => (
                <Avatar
                  key={i}
                  className="h-7 w-7 border-2 border-white"
                >
                  <AvatarImage
                    src={participant.photoUrl}
                    alt={participant.name}
                  />
                  <AvatarFallback className="text-xs">{participant.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            {event.participants.length > 3 && (
              <span className="text-xs text-gray-500 ml-2">+{event.participants.length - 3} еще</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

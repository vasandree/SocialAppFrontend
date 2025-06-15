import { ArrowLeft, Calendar, MapPin, Info, Users, MoreVertical } from 'lucide-react';

import type { EventData } from './event-card';

import { Button } from '@/components/ui/button';
import { useMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface EventDetailPanelProps {
  event: EventData;
  onClose: () => void;
}

export const EventDetailPanel = ({ event, onClose }: EventDetailPanelProps) => {
  const isMobile = useMobile();

  return (
    <div className="fixed top-0 right-0 bottom-0 z-50 w-full md:w-96 bg-white shadow-lg overflow-auto">
      <div className="p-6 flex flex-col">
        {isMobile && (
          <Button
            variant="ghost"
            onClick={onClose}
            className="self-start mb-4 -ml-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад
          </Button>
        )}

        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold">{event.title}</h1>
          {!isMobile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                >
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Редактировать</DropdownMenuItem>
                <DropdownMenuItem>Поделиться</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Удалить</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="space-y-6 mb-6">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <div className="font-medium">Дата и время</div>
              <div className="text-gray-600">{event.dateRange}</div>
            </div>
          </div>

          {event.location && (
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <div className="font-medium">Место</div>
                <div className="text-gray-600">{event.location}</div>
              </div>
            </div>
          )}

          {event.type && (
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <div className="font-medium">Тип события</div>
                <div className="text-gray-600">{event.type}</div>
              </div>
            </div>
          )}

          {event.participants && event.participants.length > 0 && (
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <div className="font-medium">Участники</div>
                <div className="text-gray-600">{event.participants.map((p) => p.name).join(', ')}</div>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="font-medium mb-2">Описание</h2>
          <p className="text-gray-600">
            Описание описание описание описание описание описание описание описание описание описание описание описание
            описание описание описание описание описание описание
          </p>
        </div>

        {isMobile && (
          <div className="mt-auto pt-6">
            <Button className="w-full">Редактировать событие</Button>
          </div>
        )}
      </div>
    </div>
  );
};

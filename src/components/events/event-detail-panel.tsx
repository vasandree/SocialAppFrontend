import { ArrowLeft, Calendar, MapPin, Info, Users } from 'lucide-react';


import { Button } from '@/components/ui/button';
import { useLanguage } from '@/app/language-context.tsx';

interface EventDetailPanelProps {
  event: EventData;
  onClose: () => void;
}

export const EventDetailPanel = ({ event, onClose }: EventDetailPanelProps) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 bg-background shadow-lg overflow-auto">
      <div className="p-6 flex flex-col">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={onClose}
            className="-ml-2 mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{event.title}</h1>
        </div>

        <div className="space-y-6 mb-6">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <div className="font-medium">{t('common.date')}</div>
              <div className="text-muted-foreground">{event.dateRange}</div>
            </div>
          </div>

          {event.location && (
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <div className="font-medium">{t('common.location')}</div>
                <div className="text-muted-foreground">{event.location}</div>
              </div>
            </div>
          )}

          {event.type && (
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <div className="font-medium">{t('common.type')}</div>
                <div className="text-muted-foreground">{event.type}</div>
              </div>
            </div>
          )}

          {event.participants && event.participants.length > 0 && (
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <div className="font-medium">{t('events.participants')}</div>
                <div className="text-muted-foreground">{event.participants.map((p) => p.name).join(', ')}</div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h2 className="font-medium mb-2">{t('common.description')}</h2>
          <p className="text-muted-foreground whitespace-pre-wrap">
            Описание описание описание описание описание описание описание описание описание описание описание описание
            описание описание описание описание описание описание
          </p>
        </div>

        <div className="mt-auto pt-6 flex gap-2">
          <Button className="flex-1">{t('common.edit')}</Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            {t('common.cancel')}
          </Button>
        </div>
      </div>
    </div>
  );
};

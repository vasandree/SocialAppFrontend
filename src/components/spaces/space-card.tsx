import { Users, Briefcase, Calendar, Info, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/lib/language-context';

export interface SpaceProps {
  id?: string;
  title: string;
  description: string;
  usersCount: number;
  tasksCount: number;
  eventsCount: number;
}

export const SpaceCard = ({ space }: { space: SpaceProps }) => {
  const router = useNavigate();
  const { t } = useLanguage();
  const spaceId = space.id || '1'; // Fallback ID if not provided

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on buttons or dropdown
    if (e.target instanceof HTMLElement && (e.target.closest('button') || e.target.closest('[role="menuitem"]'))) {
      return;
    }
    router(`/spaces/${spaceId}`);
  };

  return (
    <Card
      className="border border-border rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200 bg-card"
      onClick={handleCardClick}
    >
      <CardContent className="p-6 bg-card">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-2xl font-bold">{space.title}</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <Info className="h-5 w-5" />
            </Button>
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
                <DropdownMenuItem>{t('common.edit')}</DropdownMenuItem>
                <DropdownMenuItem>{t('spaces.share')}</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">{t('common.delete')}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <p className="text-muted-foreground mb-6 line-clamp-3">{space.description}</p>

        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <Users className="h-5 w-5" />
            <span>{space.usersCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="h-5 w-5" />
            <span>{space.tasksCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-5 w-5" />
            <span>{space.eventsCount}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

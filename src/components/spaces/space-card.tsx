import { Users, Briefcase, Calendar, Info, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface SpaceProps {
  title: string;
  description: string;
  usersCount: number;
  tasksCount: number;
  eventsCount: number;
}

export const SpaceCard = ({ space }: { space: SpaceProps }) => {
  return (
    <Card className="border-indigo-600 border rounded-xl overflow-hidden">
      <CardContent className="p-6">
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
                <DropdownMenuItem>Редактировать</DropdownMenuItem>
                {/*<DropdownMenuItem>Поделиться</DropdownMenuItem>*/}
                <DropdownMenuItem className="text-red-600">Удалить</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <p className="text-gray-600 mb-6 line-clamp-3">{space.description}</p>

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

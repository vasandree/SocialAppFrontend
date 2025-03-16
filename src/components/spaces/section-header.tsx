import { ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WorkspaceFormDialog } from './workspace-form-dialog';

interface SectionHeaderProps {
  title: string;
  showViewAll?: boolean;
  onViewAllClick?: () => void;
  showCreateButton?: boolean;
}

export const SectionHeader = ({
  title,
  showViewAll = true,
  onViewAllClick,
  showCreateButton = false,
}: SectionHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex gap-2 items-center">
        {showViewAll && (
          <Button
            variant="link"
            className="text-indigo-600 flex items-center gap-1"
            onClick={onViewAllClick}
          >
            Показать все
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}

        {showCreateButton && (
          <WorkspaceFormDialog>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Создать пространство
            </Button>
          </WorkspaceFormDialog>
        )}
      </div>
    </div>
  );
};

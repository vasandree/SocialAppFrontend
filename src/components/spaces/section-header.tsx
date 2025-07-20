import { ChevronRight, Plus } from 'lucide-react';

import { WorkspaceFormDialog } from './workspace-form-dialog';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/app/language-context.tsx';

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
  const { t } = useLanguage();

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex gap-2 items-center">
        {showViewAll && (
          <Button
            variant="link"
            className="text-primary flex items-center gap-1"
            onClick={onViewAllClick}
          >
            {t('common.showAll')}
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}

        {showCreateButton && (
          <WorkspaceFormDialog>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-1">
              <Plus className="h-4 w-4" />
              {t('spaces.create')}
            </Button>
          </WorkspaceFormDialog>
        )}
      </div>
    </div>
  );
};

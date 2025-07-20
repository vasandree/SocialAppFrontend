import { ArrowLeft } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { useLanguage } from '@/app/language-context.tsx';
import { useGetClusterById } from '@/utils/api/hooks';
import { useGetRelationsBySocialNode } from '@/utils/api/hooks/Relation/useGetRelationsBySocialNode';
import type { RelationDto } from '@/utils/api';

export const ClusterPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: cluster, isLoading, isError } = useGetClusterById({ id: id ?? '' });
  const { data: relationsData, isLoading: isRelationsLoading } = useGetRelationsBySocialNode({ id: id ?? '' });
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
        <span className="text-muted-foreground">{t('common.loading')}</span>
      </div>
    );
  }

  if (isError || !cluster) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
        <span className="text-destructive">{t('common.error')}</span>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background shadow-lg p-6 flex flex-col items-center md:items-start overflow-auto">
      <div className="w-full flex justify-between items-center mb-4">
        <Button
          variant="ghost"
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="md:hidden">{t('common.back')}</span>
        </Button>
      </div>

      <div className="flex flex-col items-center mb-6">
        <Avatar className="h-32 w-32 mb-4">
          <AvatarImage
            src={cluster.avatarUrl || '/placeholder.svg'}
            alt={`${cluster.name ?? ''}`}
          />
          <AvatarFallback className="bg-muted text-muted-foreground text-3xl">{cluster.name?.[0]}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">{cluster.name ?? ''}</h1>
        {cluster.description && <p className="text-muted-foreground text-center mt-2">{cluster.description}</p>}
      </div>

      {/* Блок отношений */}
      <div className="w-full mb-6">
        <h2 className="text-sm text-muted-foreground mb-2">{t('cluster.relationships')}</h2>
        {isRelationsLoading ? (
          <span className="text-muted-foreground">{t('common.loading')}</span>
        ) : (
          <>
            <div className="mb-2">
              <span className="text-muted-foreground">Всего отношений: {relationsData?.length ?? 0}</span>
            </div>
            {relationsData && relationsData.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {relationsData.map((relation: RelationDto, index: number) => {
                  const colors = [
                    'bg-lime-200 text-lime-800',
                    'bg-yellow-200 text-yellow-800',
                    'bg-sky-200 text-sky-800',
                  ];
                  return (
                    <Badge
                      key={index}
                      className={`font-normal ${colors[index % colors.length]}`}
                      title={relation.description}
                    >
                      <span>
                        <span className="font-semibold">{relation.name}</span>
                        {relation.description && (
                          <span className="ml-1 text-xs text-muted-foreground">({relation.description})</span>
                        )}
                      </span>
                    </Badge>
                  );
                })}
              </div>
            ) : (
              <span className="text-muted-foreground">{t('cluster.no_relationships')}</span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

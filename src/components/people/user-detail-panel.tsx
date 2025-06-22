import { ArrowLeft, Instagram, Github, MessageCircle } from 'lucide-react';

import type { UserData } from './user-card';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/lib/language-context';

interface UserDetailPanelProps {
  user: UserData;
  onClose: () => void;
}

export const UserDetailPanel = ({ user, onClose }: UserDetailPanelProps) => {
  const isMobile = useMobile();
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 bg-background shadow-lg p-6 flex flex-col items-center md:items-start overflow-auto">
      <div className="w-full flex justify-between items-center mb-4">
        <Button
          variant="ghost"
          onClick={onClose}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="md:hidden">{t('common.back')}</span>
        </Button>
      </div>

      <div className="flex flex-col items-center mb-6">
        <Avatar className="h-32 w-32 mb-4">
          <AvatarImage
            src={user.photoUrl || '/placeholder.svg'}
            alt={`${user.firstName} ${user.lastName}`}
          />
          <AvatarFallback className="bg-muted text-muted-foreground text-3xl">
            {user.firstName[0]}
            {user.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">
          {user.lastName} {user.firstName}
        </h1>
      </div>

      {user.relationships && user.relationships.length > 0 && (
        <div className="w-full mb-6">
          <h2 className="text-sm text-muted-foreground mb-2">{t('people.relationships')}</h2>
          <div className="flex flex-wrap gap-2">
            {user.relationships.map((relationship, index) => {
              const colors = ['bg-lime-200 text-lime-800', 'bg-yellow-200 text-yellow-800', 'bg-sky-200 text-sky-800'];
              return (
                <Badge
                  key={index}
                  className={`font-normal ${colors[index % colors.length]}`}
                >
                  {relationship}
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      {(user.email || user.phone) && (
        <div className="w-full mb-6">
          <h2 className="text-sm text-muted-foreground mb-2">{t('people.contact')}</h2>
          {user.email && (
            <div className="flex justify-between items-center mb-2">
              <span>{t('people.email')}:</span>
              <a
                href={`mailto:${user.email}`}
                className="text-primary hover:underline"
              >
                {user.email}
              </a>
            </div>
          )}
          {user.phone && (
            <div className="flex justify-between items-center">
              <span>{t('people.phone')}:</span>
              <a
                href={`tel:${user.phone}`}
                className="text-primary hover:underline"
              >
                {user.phone}
              </a>
            </div>
          )}
        </div>
      )}

      {user.socialLinks && Object.values(user.socialLinks).some(Boolean) && (
        <div className="w-full">
          <h2 className="text-sm text-muted-foreground mb-2">{t('people.social')}</h2>
          <div className="grid grid-cols-2 gap-2">
            {user.socialLinks.instagram && (
              <a
                href="#"
                className="flex items-center gap-2 text-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
                {user.socialLinks.instagram}
              </a>
            )}
            {user.socialLinks.github && (
              <a
                href="#"
                className="flex items-center gap-2 text-foreground hover:text-primary"
              >
                <Github className="h-5 w-5" />
                {user.socialLinks.github}
              </a>
            )}
            {user.socialLinks.telegram && (
              <a
                href="#"
                className="flex items-center gap-2 text-foreground hover:text-primary"
              >
                <MessageCircle className="h-5 w-5" />
                {user.socialLinks.telegram}
              </a>
            )}
            {user.socialLinks.vk && (
              <a
                href="#"
                className="flex items-center gap-2 text-foreground hover:text-primary"
              >
                <div className="h-5 w-5 flex items-center justify-center font-bold text-sm">В</div>
                {user.socialLinks.vk}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

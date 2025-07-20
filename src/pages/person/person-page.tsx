import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaPinterest,
  FaSnapchatGhost,
  FaTiktok,
  FaRedditAlien,
  FaWhatsapp,
  FaTelegramPlane,
  FaGithub,
  FaTwitch,
  FaVk,
} from 'react-icons/fa';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'react-router-dom';
import type { ElementType } from 'react';

import { Button } from '@/components/ui/button.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { useLanguage } from '@/app/language-context.tsx';
import { useGetPersonById } from '@/utils/api/hooks';
import { useGetPersonSocialNetworkAccounts } from '@/utils/api/hooks/PersonSocialNetworkAccounts/useGetPersonSocialNetworkAccounts';
import { useGetRelationsBySocialNode } from '@/utils/api/hooks/Relation/useGetRelationsBySocialNode';
import type { RelationDto, SocialNetworkDto } from '@/utils/api';

export const PersonPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: person, isLoading, isError } = useGetPersonById({ id: id ?? '' });
  const { data: socialAccountsData, isLoading: isSocialAccountsLoading } = useGetPersonSocialNetworkAccounts({
    id: id ?? '',
  });
  const { data: relationsData, isLoading: isRelationsLoading } = useGetRelationsBySocialNode({ id: id ?? '' });
  const { t } = useLanguage();

  const socialIcons: Record<string, ElementType> = {
    Facebook: FaFacebook,
    Twitter: FaTwitter,
    Linkedin: FaLinkedin,
    Instagram: FaInstagram,
    Youtube: FaYoutube,
    Pinterest: FaPinterest,
    Snapchat: FaSnapchatGhost,
    Tiktok: FaTiktok,
    Reddit: FaRedditAlien,
    Whatsapp: FaWhatsapp,
    Github: FaGithub,
    Telegram: FaTelegramPlane,
    Twitch: FaTwitch,
    Vk: FaVk,
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
        <span className="text-muted-foreground">{t('common.loading')}</span>
      </div>
    );
  }

  if (isError || !person) {
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
            src={person.avatarUrl || '/placeholder.svg'}
            alt={`${person.name ?? ''}`}
          />
          <AvatarFallback className="bg-muted text-muted-foreground text-3xl">{person.name?.[0]}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">{person.name ?? ''}</h1>
        {person.description && <p className="text-muted-foreground text-center mt-2">{person.description}</p>}
      </div>

      {/* Новый блок отношений */}
      <div className="w-full mb-6">
        <h2 className="text-sm text-muted-foreground mb-2">{t('people.relationships')}</h2>
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
              <span className="text-muted-foreground">{t('people.no_relationships')}</span>
            )}
          </>
        )}
      </div>

      {/* Контакты */}
      {(person.email || person.phoneNumber) && (
        <div className="w-full mb-6">
          <h2 className="text-sm text-muted-foreground mb-2">{t('people.contact')}</h2>
          {person.email && (
            <div className="flex justify-between items-center mb-2">
              <span>{t('people.email')}:</span>
              <a
                href={`mailto:${person.email}`}
                className="text-primary hover:underline"
              >
                {person.email}
              </a>
            </div>
          )}
          {person.phoneNumber && (
            <div className="flex justify-between items-center">
              <span>{t('people.phone')}:</span>
              <a
                href={`tel:${person.phoneNumber}`}
                className="text-primary hover:underline"
              >
                {person.phoneNumber}
              </a>
            </div>
          )}
        </div>
      )}

      {/* Новый блок социальных сетей */}
      <div className="w-full mb-6">
        <h2 className="text-sm text-muted-foreground mb-2">{t('people.social')}</h2>
        {isSocialAccountsLoading ? (
          <span className="text-muted-foreground">{t('common.loading')}</span>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {socialAccountsData && socialAccountsData.length > 0 ? (
              socialAccountsData.map((account: SocialNetworkDto, idx: number) => {
                const Icon = socialIcons[account.type] || FaGithub;
                return (
                  <a
                    key={idx}
                    href={account.url}
                    className="flex items-center gap-2 text-foreground hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-semibold">{account.username}</span>
                    {account.url}
                  </a>
                );
              })
            ) : (
              <span className="text-muted-foreground">{t('people.no_social_accounts')}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

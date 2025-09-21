import { useState } from 'react';
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
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import type { ElementType } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/app/language-context';
import { useGetPersonById } from '@/utils/api/hooks';
import { useGetPersonSocialNetworkAccounts } from '@/utils/api/hooks/PersonSocialNetworkAccounts/useGetPersonSocialNetworkAccounts';
import { useGetRelationsBySocialNode } from '@/utils/api/hooks/Relation/useGetRelationsBySocialNode';
import type { RelationDto, SocialNetworkDto } from '@/utils/api';
import { routes } from '@/utils/consts/routes';
import { usePostCreatePersonSocialNetworkAccount } from '@/utils/api/hooks/PersonSocialNetworkAccounts/usePostCreatePersonSocialNetworkAccount';
import { usePutEditPersonSocialNetworkAccount } from '@/utils/api/hooks/PersonSocialNetworkAccounts/usePutEditPersonSocialNetworkAccount';
import { useDeletePersonSocialNetworkAccount } from '@/utils/api/hooks/PersonSocialNetworkAccounts/useDeletePersonSocialNetworkAccount';
import { SocialNetwork } from '@/utils/api/types';
import { SocialNetworkModal } from '@/components/person/social-network-modal';
import { SocialNetworkDeleteModal } from '@/components/person/social-network-delete-modal';
import { PersonSocialNetworks } from '@/components/person/person-social-networks.tsx';
import { usePutEditPerson } from '@/utils/api/hooks/Person/usePutEditPerson';
import { useDeletePerson } from '@/utils/api/hooks/Person/useDeletePerson';
import { DeletePersonModal } from '@/components/person/delete-person-modal.tsx';
import { useToast } from '@/hooks/use-toast.ts';
import { PersonCreationForm } from '@/components/people/person-creation-form.tsx';

const socialIcons: Record<SocialNetwork, ElementType> = {
  [SocialNetwork.Instagram]: FaInstagram,
  [SocialNetwork.GitHub]: FaGithub,
  [SocialNetwork.Telegram]: FaTelegramPlane,
  [SocialNetwork.Vk]: FaVk,
  [SocialNetwork.Facebook]: FaFacebook,
  [SocialNetwork.Twitter]: FaTwitter,
  [SocialNetwork.LinkedIn]: FaLinkedin,
  [SocialNetwork.YouTube]: FaYoutube,
  [SocialNetwork.Pinterest]: FaPinterest,
  [SocialNetwork.Snapchat]: FaSnapchatGhost,
  [SocialNetwork.TikTok]: FaTiktok,
  [SocialNetwork.Reddit]: FaRedditAlien,
  [SocialNetwork.WhatsApp]: FaWhatsapp,
  [SocialNetwork.Twitch]: FaTwitch,
};

export const PersonPage = () => {
  const { personId } = useParams<{ personId: string }>();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: person, isLoading, isError } = useGetPersonById({ id: personId ?? '' });
  const { data: socialAccountsData } = useGetPersonSocialNetworkAccounts({ id: personId ?? '' });
  const { data: relationsData } = useGetRelationsBySocialNode({ id: personId ?? '' });

  const createSocialNetwork = usePostCreatePersonSocialNetworkAccount();
  const editSocialNetwork = usePutEditPersonSocialNetworkAccount();
  const deleteSocialNetwork = useDeletePersonSocialNetworkAccount();
  const putEditPerson = usePutEditPerson();
  const deletePersonMutation = useDeletePerson();

  const [isEditing, setIsEditing] = useState(false);
  const [editedPerson, setEditedPerson] = useState(person);

  const [socialModal, setSocialModal] = useState<{
    open: boolean;
    mode: 'add' | 'edit';
    platform?: SocialNetwork;
    acc?: SocialNetworkDto;
    value?: string;
  }>({ open: false, mode: 'add' });

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    acc?: SocialNetworkDto;
  }>({ open: false });

  const [deletePersonModal, setDeletePersonModal] = useState(false);

  // Добавим состояние для формы редактирования
  const [editFormSubmit, setEditFormSubmit] = useState<(() => Promise<void>) | null>(null);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="text-muted-foreground">{t('common.loading')}</span>
      </div>
    );
  }

  if (isError || !person) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="text-destructive">{t('common.error')}</span>
      </div>
    );
  }

  const handleSavePerson = async () => {
    if (editFormSubmit) {
      await editFormSubmit();
      setIsEditing(false);
      await queryClient.invalidateQueries(['person', personId]);
    }
  };

  const handleDeletePerson = async () => setDeletePersonModal(true);

  const handleDeletePersonConfirm = async () => {
    if (!personId) return;
    await deletePersonMutation.mutateAsync(
      { id: personId },
      {
        onSuccess: () => {
          setDeletePersonModal(false);
          navigate(routes.people());
        },
        onError: (error) => {
          console.error('Ошибка при удалении пользователя:', error);
        },
      }
    );
  };

  const handleAddSocialLink = () => {
    setSocialModal({ open: true, mode: 'add' });
  };

  const handleEditSocialLink = (acc: SocialNetworkDto) => {
    setSocialModal({
      open: true,
      mode: 'edit',
      platform: acc.type as SocialNetwork,
      acc,
      value: acc.username || acc.url || '',
    });
  };

  const handleDeleteSocialLink = (acc: SocialNetworkDto) => {
    setDeleteModal({ open: true, acc });
  };

  const handleSocialModalConfirm = async () => {
    try {
      if (socialModal.mode === 'add' && socialModal.platform && socialModal.value && personId) {
        await createSocialNetwork.mutateAsync({
          id: personId,
          params: { type: socialModal.platform, username: socialModal.value },
        });
      }
      if (socialModal.mode === 'edit' && socialModal.acc && socialModal.value) {
        await editSocialNetwork.mutateAsync({
          id: socialModal.acc.id,
          params: { username: socialModal.value },
        });
      }
      setSocialModal({ open: false, mode: 'add' });
      await queryClient.invalidateQueries(['person-social-accounts', personId]);
    } catch (error: any) {
      if (error?.response?.status === 400) {
        toast({
          title: 'Аккаунт уже добавлен',
          description: 'Этот аккаунт уже существует у пользователя.',
          status: 'error',
        });
      } else {
      }
    }
  };

  const handleDeleteModalConfirm = async () => {
    if (deleteModal.acc) {
      await deleteSocialNetwork.mutateAsync({ id: deleteModal.acc.id });
    }
    setDeleteModal({ open: false });
    await queryClient.invalidateQueries(['person-social-accounts', personId]);
  };

  return (
    <>
      <div className="min-h-screen bg-background shadow-lg overflow-auto">
        <div className="w-full flex justify-between items-center p-4 border-b">
          <Button
            variant="ghost"
            onClick={() => navigate(routes.people())}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="md:hidden">{t('common.back')}</span>
          </Button>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" /> Редактировать
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={handleDeletePerson}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Удалить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="p-8 flex flex-col items-center">
          <Avatar className="h-32 w-32 mb-4 border-4 border-primary/20">
            <AvatarImage
              src={person.avatarUrl || '/placeholder.svg'}
              alt={person.name}
            />
            <AvatarFallback className="bg-muted text-muted-foreground text-3xl">
              {person.name?.[0] ?? '?'}
            </AvatarFallback>
          </Avatar>
          {isEditing ? (
            <div className="w-full max-w-md space-y-4">
              <PersonCreationForm
                setSubmitForm={setEditFormSubmit}
                initialValues={{
                  name: person.name,
                  description: person.description,
                  email: person.email,
                  phoneNumber: person.phoneNumber,
                  avatarUrl: person.avatarUrl,
                  mode: 'edit',
                  id: personId,
                }}
                onSubmitSuccess={() => setIsEditing(false)}
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSavePerson}
                  className="flex-1"
                >
                  Сохранить
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="flex-1"
                >
                  Отмена
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-2xl">
              <div className="mb-6 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-1 text-center">{person.name}</h1>{' '}
                {person.description && (
                  <p className="text-sm text-muted-foreground text-center">{person.description}</p>
                )}
              </div>
              <div className="space-y-6">
                {relationsData && relationsData.length > 0 && (
                  <div>
                    <h2 className="text-sm text-muted-foreground mb-2">{t('people.relationships')}</h2>
                    <div className="flex flex-wrap gap-2">
                      {relationsData.map((relation: RelationDto) => (
                        <Badge
                          key={relation.id}
                          className="font-normal"
                          style={{ backgroundColor: relation.color }}
                        >
                          {relation.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {(person.email || person.phoneNumber) && (
                  <div>
                    <h2 className="text-sm text-muted-foreground mb-3">{t('people.contact')}</h2>
                    <div className="space-y-2">
                      {person.email && (
                        <div className="flex justify-between items-center">
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
                  </div>
                )}

                {!isEditing && (
                  <PersonSocialNetworks
                    socialAccountsData={socialAccountsData}
                    t={t}
                    onAdd={handleAddSocialLink}
                    onEdit={handleEditSocialLink}
                    onDelete={handleDeleteSocialLink}
                    socialIcons={socialIcons}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <SocialNetworkModal
        open={socialModal.open}
        mode={socialModal.mode}
        platform={socialModal.platform}
        value={socialModal.value}
        onChange={(fields) => setSocialModal((m) => ({ ...m, ...fields }))}
        onCancel={() => setSocialModal({ open: false, mode: 'add' })}
        onConfirm={handleSocialModalConfirm}
        disabled={socialModal.mode === 'add' ? !socialModal.platform || !socialModal.value : !socialModal.value}
      />

      <SocialNetworkDeleteModal
        open={deleteModal.open}
        acc={deleteModal.acc}
        onCancel={() => setDeleteModal({ open: false })}
        onConfirm={handleDeleteModalConfirm}
      />

      <DeletePersonModal
        open={deletePersonModal}
        personName={person.name}
        onCancel={() => setDeletePersonModal(false)}
        onConfirm={handleDeletePersonConfirm}
      />
    </>
  );
};

import { ChangeEvent, useEffect, useState } from 'react';

import { AvatarPicker } from './avatar-picker';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/app/language-context.tsx';
import { usePostCreateCluster, usePostCreatePerson, usePostCreatePlace } from '@/utils/api/hooks';
import { useToast } from '@/hooks/use-toast.ts';
import { usersMock } from '@/lib/mock-data.ts';

interface PersonCreationFormProps {
  onSubmitSuccess?: () => void;
  setSubmitForm?: (cb: () => Promise<void>) => void;
}

export const PersonCreationForm = ({ onSubmitSuccess, setSubmitForm }: PersonCreationFormProps) => {
  const [tab, setTab] = useState<'person' | 'place' | 'cluster'>('person');
  const { toast } = useToast();
  const { t } = useLanguage();
  // person
  const [personName, setPersonName] = useState('');
  const [personDescription, setPersonDescription] = useState('');
  const [personEmail, setPersonEmail] = useState('');
  const [personPhone, setPersonPhone] = useState('');
  // place
  const [placeName, setPlaceName] = useState('');
  const [placeDescription, setPlaceDescription] = useState('');
  // cluster
  const [clusterName, setClusterName] = useState('');
  const [clusterDescription, setClusterDescription] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  // avatar
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const createPerson = usePostCreatePerson();
  const createCluster = usePostCreateCluster();
  const createPlace = usePostCreatePlace();

  const handleSubmit = async () => {
    try {
      if (tab === 'person') {
        const formData = new FormData();
        formData.append('name', personName);
        formData.append('description', personDescription);
        formData.append('email', personEmail);
        formData.append('phoneNumber', personPhone);
        if (avatarFile) formData.append('avatar', avatarFile);
        await createPerson.mutateAsync(
          { params: formData, config: {} },
          {
            onSuccess: () => {
              toast({ title: t('personCreation.personCreated') });
            },
          }
        );
      } else if (tab === 'place') {
        const formData = new FormData();
        formData.append('name', placeName);
        formData.append('description', placeDescription);
        if (avatarFile) formData.append('avatar', avatarFile);
        await createPlace.mutateAsync(
          { params: formData, config: {} },
          {
            onSuccess: () => {
              toast({ title: t('personCreation.placeCreated') });
            },
          }
        );
      } else if (tab === 'cluster') {
        const formData = new FormData();
        formData.append('name', clusterName);
        formData.append('description', clusterDescription);
        if (avatarFile) formData.append('avatar', avatarFile);
        selectedUsers.forEach((id) => formData.append('users', id));
        await createCluster.mutateAsync(
          { params: formData, config: {} },
          {
            onSuccess: () => {
              toast({ title: t('personCreation.clusterCreated') });
            },
          }
        );
      }
      setPersonName('');
      setPersonDescription('');
      setPersonEmail('');
      setPersonPhone('');
      setPlaceName('');
      setPlaceDescription('');
      setClusterName('');
      setClusterDescription('');
      setSelectedUsers([]);
      setAvatarFile(null);
      setAvatarPreview(null);
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (e) {}
  };

  useEffect(() => {
    if (setSubmitForm) setSubmitForm(() => handleSubmit);
  }, [
    setSubmitForm,
    tab,
    personName,
    personDescription,
    personEmail,
    personPhone,
    placeName,
    placeDescription,
    clusterName,
    clusterDescription,
    selectedUsers,
    avatarFile,
    handleSubmit,
  ]);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUserToggle = (userId: string) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]));
  };

  const removeSelectedUser = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((id) => id !== userId));
  };

  const clearAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    ['person-avatar', 'place-avatar', 'cluster-avatar'].forEach((inputId) => {
      const input = document.getElementById(inputId) as HTMLInputElement;
      if (input) input.value = '';
    });
  };

  return (
    <Tabs
      defaultValue="person"
      value={tab}
      onValueChange={(v) => setTab(v as typeof tab)}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="person">{t('personCreation.personTab')}</TabsTrigger>
        <TabsTrigger value="place">{t('personCreation.placeTab')}</TabsTrigger>
        <TabsTrigger value="cluster">{t('personCreation.clusterTab')}</TabsTrigger>
      </TabsList>

      <TabsContent
        value="person"
        className="space-y-4"
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="person-name">{t('personCreation.personName')} *</Label>
            <Input
              id="person-name"
              placeholder={t('personCreation.personNamePlaceholder')}
              required
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="person-description">{t('common.description')}</Label>
            <Textarea
              id="person-description"
              placeholder={t('personCreation.personDescriptionPlaceholder')}
              className="resize-none"
              rows={3}
              value={personDescription}
              onChange={(e) => setPersonDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="person-email">{t('people.email')}</Label>
            <Input
              id="person-email"
              type="email"
              placeholder="example@email.com"
              value={personEmail}
              onChange={(e) => setPersonEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="person-phone">{t('people.phone')}</Label>
            <Input
              id="person-phone"
              type="tel"
              placeholder="+7 (999) 999-99-99"
              value={personPhone}
              onChange={(e) => setPersonPhone(e.target.value)}
            />
          </div>
          <AvatarPicker
            id="person-avatar"
            avatarPreview={avatarPreview}
            avatarFile={avatarFile}
            handleAvatarChange={handleAvatarChange}
            clearAvatar={clearAvatar}
            label="Аватар"
          />
        </div>
      </TabsContent>

      <TabsContent
        value="place"
        className="space-y-4"
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="place-name">{t('personCreation.placeName')} *</Label>
            <Input
              id="place-name"
              placeholder={t('personCreation.placeNamePlaceholder')}
              required
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="place-description">{t('common.description')}</Label>
            <Textarea
              id="place-description"
              placeholder={t('personCreation.placeDescriptionPlaceholder')}
              className="resize-none"
              rows={3}
              value={placeDescription}
              onChange={(e) => setPlaceDescription(e.target.value)}
            />
          </div>
          <AvatarPicker
            id="place-avatar"
            avatarPreview={avatarPreview}
            avatarFile={avatarFile}
            handleAvatarChange={handleAvatarChange}
            clearAvatar={clearAvatar}
            label="Изображение"
          />
        </div>
      </TabsContent>

      <TabsContent
        value="cluster"
        className="space-y-4"
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="cluster-name">{t('personCreation.clusterName')} *</Label>
            <Input
              id="cluster-name"
              placeholder={t('personCreation.clusterNamePlaceholder')}
              required
              value={clusterName}
              onChange={(e) => setClusterName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cluster-description">{t('common.description')}</Label>
            <Textarea
              id="cluster-description"
              placeholder={t('personCreation.clusterDescriptionPlaceholder')}
              className="resize-none"
              rows={3}
              value={clusterDescription}
              onChange={(e) => setClusterDescription(e.target.value)}
            />
          </div>
          <AvatarPicker
            id="cluster-avatar"
            avatarPreview={avatarPreview}
            avatarFile={avatarFile}
            handleAvatarChange={handleAvatarChange}
            clearAvatar={clearAvatar}
            label="Изображение"
          />
          <div className="grid gap-2">
            <Label>{t('personCreation.members')}</Label>
            <Select onValueChange={handleUserToggle}>
              <SelectTrigger>
                <SelectValue placeholder={t('personCreation.selectMembers')} />
              </SelectTrigger>
              <SelectContent>
                {usersMock.map((user) => (
                  <SelectItem
                    key={user.id}
                    value={user.id}
                    disabled={selectedUsers.includes(user.id)}
                  >
                    {user.firstName} {user.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedUsers.length > 0 && (
              <div className="mt-2">
                <Label className="text-sm text-muted-foreground">{t('personCreation.selectedMembers')}</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedUsers.map((userId) => {
                    const user = usersMock.find((u) => u.id === userId);
                    if (!user) return null;
                    return (
                      <div
                        key={userId}
                        className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                      >
                        <span>
                          {user.firstName} {user.lastName}
                        </span>
                        <button
                          type="button"
                          className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground rounded"
                          onClick={() => removeSelectedUser(userId)}
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

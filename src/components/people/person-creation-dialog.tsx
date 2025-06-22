import { useState } from 'react';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/lib/language-context';
import { usersMock } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PersonCreationDialogProps {
  children: React.ReactNode;
}

export const PersonCreationDialog = ({ children }: PersonCreationDialogProps) => {
  const [open, setOpen] = useState(false);
  const isMobile = useMobile();
  const { t } = useLanguage();

  if (isMobile) {
    return (
      <Drawer
        open={open}
        onOpenChange={setOpen}
      >
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Создать новый элемент</DrawerTitle>
            <DrawerDescription>Выберите тип элемента для создания</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <PersonCreationForm />
          </div>
          <DrawerFooter className="pt-2">
            <Button>Создать</Button>
            <DrawerClose asChild>
              <Button variant="outline">Отмена</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Создать новый элемент</DialogTitle>
          <DialogDescription>Выберите тип элемента для создания</DialogDescription>
        </DialogHeader>
        <PersonCreationForm />
        <DialogFooter>
          <Button type="submit">Создать</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const PersonCreationForm = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <Tabs
      defaultValue="person"
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="person">Человек</TabsTrigger>
        <TabsTrigger value="place">Место</TabsTrigger>
        <TabsTrigger value="cluster">Кластер</TabsTrigger>
      </TabsList>

      <TabsContent
        value="person"
        className="space-y-4"
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="person-name">Имя *</Label>
            <Input
              id="person-name"
              placeholder="Введите имя"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="person-description">Описание</Label>
            <Textarea
              id="person-description"
              placeholder="Описание человека"
              className="resize-none"
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="person-email">Email</Label>
            <Input
              id="person-email"
              type="email"
              placeholder="example@email.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="person-phone">Номер телефона</Label>
            <Input
              id="person-phone"
              type="tel"
              placeholder="+7 (999) 999-99-99"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="person-avatar">Аватар</Label>
            <div className="flex items-center gap-4">
              {avatarPreview && (
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={avatarPreview || '/placeholder.svg'}
                    alt="Preview"
                  />
                  <AvatarFallback>Превью</AvatarFallback>
                </Avatar>
              )}
              <Input
                id="person-avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent
        value="place"
        className="space-y-4"
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="place-name">Название *</Label>
            <Input
              id="place-name"
              placeholder="Введите название места"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="place-description">Описание</Label>
            <Textarea
              id="place-description"
              placeholder="Описание места"
              className="resize-none"
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="place-avatar">Изображение</Label>
            <div className="flex items-center gap-4">
              {avatarPreview && (
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={avatarPreview || '/placeholder.svg'}
                    alt="Preview"
                  />
                  <AvatarFallback>Превью</AvatarFallback>
                </Avatar>
              )}
              <Input
                id="place-avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent
        value="cluster"
        className="space-y-4"
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="cluster-name">Название *</Label>
            <Input
              id="cluster-name"
              placeholder="Введите название кластера"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cluster-description">Описание</Label>
            <Textarea
              id="cluster-description"
              placeholder="Описание кластера"
              className="resize-none"
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cluster-avatar">Изображение</Label>
            <div className="flex items-center gap-4">
              {avatarPreview && (
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={avatarPreview || '/placeholder.svg'}
                    alt="Preview"
                  />
                  <AvatarFallback>Превью</AvatarFallback>
                </Avatar>
              )}
              <Input
                id="cluster-avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Участники</Label>
            <Select onValueChange={handleUserToggle}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите участников" />
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
                <Label className="text-sm text-muted-foreground">Выбранные участники:</Label>
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
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => removeSelectedUser(userId)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
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

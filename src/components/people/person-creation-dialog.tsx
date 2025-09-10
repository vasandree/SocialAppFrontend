import { ReactNode, useState } from 'react';

import { PersonCreationForm } from './person-creation-form';

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
import { useMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/app/language-context.tsx';

interface PersonCreationDialogProps {
  children: ReactNode;
}

export const PersonCreationDialog = ({ children }: PersonCreationDialogProps) => {
  const [open, setOpen] = useState(false);
  const isMobile = useMobile();
  const { t } = useLanguage();
  const [submitForm, setSubmitForm] = useState<(() => Promise<void>) | null>(null);

  if (isMobile) {
    return (
      <Drawer
        open={open}
        onOpenChange={setOpen}
      >
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{t('personCreation.title')}</DrawerTitle>
            <DrawerDescription>{t('personCreation.chooseType')}</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <PersonCreationForm
              onSubmitSuccess={() => setOpen(false)}
              setSubmitForm={setSubmitForm}
            />
          </div>
          <DrawerFooter className="pt-2">
            <Button onClick={() => submitForm?.()}>{t('common.create')}</Button>
            <DrawerClose asChild>
              <Button variant="outline">{t('common.cancel')}</Button>
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
          <DialogTitle>{t('personCreation.title')}</DialogTitle>
          <DialogDescription>{t('personCreation.chooseType')}</DialogDescription>
        </DialogHeader>
        <PersonCreationForm
          onSubmitSuccess={() => setOpen(false)}
          setSubmitForm={setSubmitForm}
        />
        <DialogFooter>
          <Button
            type="button"
            onClick={() => submitForm?.()}
          >
            {t('common.create')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

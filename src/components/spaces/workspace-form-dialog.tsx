import { useState, useEffect, ReactNode, Children, isValidElement, cloneElement } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { useMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/app/language-context.tsx';

interface WorkspaceFormProps {
  children: ReactNode;
}

export const WorkspaceFormDialog = ({ children }: WorkspaceFormProps) => {
  const [open, setOpen] = useState(false);
  const isMobile = useMobile();
  const { t } = useLanguage();

  useEffect(() => {
    const childElement = Children.only(children);
    if (isValidElement(childElement)) {
      const originalOnClick = childElement.props.onClick;
      const newProps = {
        ...childElement.props,
        onClick: (e) => {
          setOpen(true);
          if (originalOnClick) originalOnClick(e);
        },
      };
      const clonedChild = cloneElement(childElement, newProps);
    }
  }, [children, setOpen]);

  if (isMobile) {
    return (
      <Drawer
        open={open}
        onOpenChange={setOpen}
      >
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{t('spaces.new')}</DrawerTitle>
            <DrawerDescription>{t('spaces.description.placeholder')}</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <WorkspaceForm />
          </div>
          <DrawerFooter className="pt-2">
            <Button>{t('spaces.create')}</Button>
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('spaces.new')}</DialogTitle>
          <DialogDescription>{t('spaces.description.placeholder')}</DialogDescription>
        </DialogHeader>
        <WorkspaceForm />
        <DialogFooter>
          <Button type="submit">{t('spaces.create')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const WorkspaceForm = () => {
  const { t } = useLanguage();

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="title">{t('common.name')}</Label>
        <Input
          id="title"
          placeholder={t('spaces.description.placeholder')}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">{t('common.description')}</Label>
        <Textarea
          id="description"
          placeholder={t('spaces.description.placeholder')}
          className="resize-none"
          rows={4}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="access">{t('spaces.access')}</Label>
        <select
          id="access"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="private">{t('spaces.access.private')}</option>
          <option value="public">{t('spaces.access.public')}</option>
          <option value="restricted">{t('spaces.access.restricted')}</option>
        </select>
      </div>
    </div>
  );
};

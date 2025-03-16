import React from 'react';

import { useState, useEffect } from 'react';
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

interface WorkspaceFormProps {
  children: React.ReactNode;
}

export const WorkspaceFormDialog = ({ children }: WorkspaceFormProps) => {
  const [open, setOpen] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const childElement = React.Children.only(children);
    if (React.isValidElement(childElement)) {
      const originalOnClick = childElement.props.onClick;
      const newProps = {
        ...childElement.props,
        onClick: (e) => {
          setOpen(true);
          if (originalOnClick) originalOnClick(e);
        },
      };
      const clonedChild = React.cloneElement(childElement, newProps);
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
            <DrawerTitle>Новое рабочее пространство</DrawerTitle>
            <DrawerDescription>Создайте новое рабочее пространство для вашего проекта</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <WorkspaceForm />
          </div>
          <DrawerFooter className="pt-2">
            <Button>Создать пространство</Button>
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Новое рабочее пространство</DialogTitle>
          <DialogDescription>Создайте новое рабочее пространство для вашего проекта</DialogDescription>
        </DialogHeader>
        <WorkspaceForm />
        <DialogFooter>
          <Button type="submit">Создать пространство</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

function WorkspaceForm() {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Название</Label>
        <Input
          id="title"
          placeholder="Введите название пространства"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Описание</Label>
        <Textarea
          id="description"
          placeholder="Описание рабочего пространства"
          className="resize-none"
          rows={4}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="access">Доступ</Label>
        <select
          id="access"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="private">Приватное</option>
          <option value="public">Публичное</option>
          <option value="restricted">Ограниченный доступ</option>
        </select>
      </div>
    </div>
  );
}

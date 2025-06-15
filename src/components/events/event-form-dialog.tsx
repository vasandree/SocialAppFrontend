import { ReactNode, useState } from 'react';

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
import { useMobile } from '@/hooks/use-mobile';

interface EventFormProps {
  children: ReactNode;
}

export const EventFormDialog = ({ children }: EventFormProps) => {
  const [open, setOpen] = useState(false);
  const isMobile = useMobile();

  if (isMobile) {
    return (
      <Drawer
        open={open}
        onOpenChange={setOpen}
      >
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Новое событие</DrawerTitle>
            <DrawerDescription>Создайте новое событие в календаре</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <EventForm />
          </div>
          <DrawerFooter className="pt-2">
            <Button>Создать событие</Button>
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Новое событие</DialogTitle>
          <DialogDescription>Создайте новое событие в календаре</DialogDescription>
        </DialogHeader>
        <EventForm />
        <DialogFooter>
          <Button type="submit">Создать событие</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const EventForm = () => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Название</Label>
        <Input
          id="title"
          placeholder="Введите название события"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="start-date">Дата начала</Label>
          <Input
            id="start-date"
            type="date"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="end-date">Дата окончания</Label>
          <Input
            id="end-date"
            type="date"
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="location">Место</Label>
        <Input
          id="location"
          placeholder="Укажите место проведения"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="type">Тип события</Label>
        <Input
          id="type"
          placeholder="Например: встреча, конференция"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Описание</Label>
        <Textarea
          id="description"
          placeholder="Описание события"
          className="resize-none"
          rows={4}
        />
      </div>
    </div>
  );
};

import { ReactNode, useState } from 'react';

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMobile } from '@/hooks/use-mobile';

interface TaskFormProps {
  children: ReactNode;
}

export const TaskFormDialog = ({ children }: TaskFormProps) => {
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
            <DrawerTitle>Новая задача</DrawerTitle>
            <DrawerDescription>Создайте новую задачу для вашего проекта</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <TaskForm />
          </div>
          <DrawerFooter className="pt-2">
            <Button>Создать задачу</Button>
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
          <DialogTitle>Новая задача</DialogTitle>
          <DialogDescription>Создайте новую задачу для вашего проекта</DialogDescription>
        </DialogHeader>
        <TaskForm />
        <DialogFooter>
          <Button type="submit">Создать задачу</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const TaskForm = () => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Название</Label>
        <Input
          id="title"
          placeholder="Введите название задачи"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="status">Статус</Label>
        <Select defaultValue="open">
          <SelectTrigger id="status">
            <SelectValue placeholder="Выберите статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Открыто</SelectItem>
            <SelectItem value="inProgress">В процессе</SelectItem>
            <SelectItem value="completed">Завершено</SelectItem>
            <SelectItem value="canceled">Отменено</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="date">Дата</Label>
        <Input
          id="date"
          type="date"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="assignee">Исполнитель</Label>
        <Select defaultValue="self">
          <SelectTrigger id="assignee">
            <SelectValue placeholder="Выберите исполнителя" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="self">Я</SelectItem>
            <SelectItem value="other">Другой пользователь</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

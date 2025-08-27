import { Upload, X } from 'lucide-react';
import { ChangeEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AvatarPickerProps {
  id: string;
  avatarPreview: string | null;
  avatarFile: File | null;
  handleAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
  clearAvatar: () => void;
  label?: string;
}

export const AvatarPicker = ({
  id,
  avatarPreview,
  avatarFile,
  handleAvatarChange,
  clearAvatar,
  label = 'Аватар',
}: AvatarPickerProps) => (
  <div className="grid gap-2">
    <Label htmlFor={id}>{label}</Label>
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
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById(id)?.click()}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Выбрать файл
        </Button>
        <Input
          id={id}
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden"
        />
        {avatarFile && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clearAvatar}
            className="text-destructive hover:text-destructive"
          >
            <X className="h-4 w-4 mr-1" />
            Удалить
          </Button>
        )}
      </div>
    </div>
  </div>
);

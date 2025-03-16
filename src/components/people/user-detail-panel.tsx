import { ArrowLeft, Instagram, Github, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { UserData } from './user-card';

interface UserDetailPanelProps {
  user: UserData;
  onClose: () => void;
}

export const UserDetailPanel = ({ user, onClose }: UserDetailPanelProps) => {
  return (
    <div className="fixed top-0 right-0 bottom-0 z-50 w-full md:w-96 bg-white shadow-lg p-6 flex flex-col items-center md:items-start overflow-auto">
      <div className="w-full flex justify-between items-center mb-4">
        <Button
          variant="ghost"
          onClick={onClose}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="md:hidden">Назад</span>
        </Button>
      </div>

      <div className="flex flex-col items-center mb-6">
        <Avatar className="h-32 w-32 mb-4">
          <AvatarImage
            src={user.photoUrl}
            alt={`${user.firstName} ${user.lastName}`}
          />
          <AvatarFallback className="bg-gray-200 text-gray-400 text-3xl">
            {user.firstName[0]}
            {user.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">
          {user.lastName} {user.firstName}
        </h1>
      </div>

      {user.relationships && user.relationships.length > 0 && (
        <div className="w-full mb-6">
          <h2 className="text-sm text-gray-500 mb-2">Связи</h2>
          <div className="flex flex-wrap gap-2">
            {user.relationships.map((relationship, index) => {
              const colors = ['bg-lime-200 text-lime-800', 'bg-yellow-200 text-yellow-800', 'bg-sky-200 text-sky-800'];
              return (
                <Badge
                  key={index}
                  className={`font-normal ${colors[index % colors.length]}`}
                >
                  {relationship}
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      {(user.email || user.phone) && (
        <div className="w-full mb-6">
          <h2 className="text-sm text-gray-500 mb-2">Контактная информация</h2>
          {user.email && (
            <div className="flex justify-between items-center mb-2">
              <span>Email:</span>
              <a
                href={`mailto:${user.email}`}
                className="text-indigo-600 hover:underline"
              >
                {user.email}
              </a>
            </div>
          )}
          {user.phone && (
            <div className="flex justify-between items-center">
              <span>Телефон:</span>
              <a
                href={`tel:${user.phone}`}
                className="text-indigo-600 hover:underline"
              >
                {user.phone}
              </a>
            </div>
          )}
        </div>
      )}

      {user.socialLinks && Object.values(user.socialLinks).some(Boolean) && (
        <div className="w-full">
          <h2 className="text-sm text-gray-500 mb-2">Соц сети</h2>
          <div className="grid grid-cols-2 gap-2">
            {user.socialLinks.instagram && (
              <a
                href="#"
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600"
              >
                <Instagram className="h-5 w-5" />
                {user.socialLinks.instagram}
              </a>
            )}
            {user.socialLinks.github && (
              <a
                href="#"
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600"
              >
                <Github className="h-5 w-5" />
                {user.socialLinks.github}
              </a>
            )}
            {user.socialLinks.telegram && (
              <a
                href="#"
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600"
              >
                <MessageCircle className="h-5 w-5" />
                {user.socialLinks.telegram}
              </a>
            )}
            {user.socialLinks.vk && (
              <a
                href="#"
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600"
              >
                <div className="h-5 w-5 flex items-center justify-center font-bold text-sm">В</div>
                {user.socialLinks.vk}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

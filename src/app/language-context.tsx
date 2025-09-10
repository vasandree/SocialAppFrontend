import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { Language } from '@/utils/api';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  Ru: {
    // Navigation
    'nav.spaces': 'Рабочие пространства',
    'nav.people': 'Люди',
    'nav.tasks': 'Задачи',
    'nav.events': 'События',
    'nav.profile': 'Профиль',

    // Common
    'common.back': 'Назад',
    'common.cancel': 'Отмена',
    'common.save': 'Сохранить',
    'common.delete': 'Удалить',
    'common.edit': 'Редактировать',
    'common.add': 'Добавить',
    'common.create': 'Создать',
    'common.search': 'Поиск',
    'common.loading': 'Загрузка...',
    'common.name': 'Название',
    'common.description': 'Описание',
    'common.date': 'Дата',
    'common.location': 'Место',
    'common.type': 'Тип',
    'common.status': 'Статус',
    'common.showAll': 'Показать все',

    // Spaces
    'spaces.title': 'Мои пространства',
    'spaces.available': 'Доступные пространства',
    'spaces.create': 'Создать пространство',
    'spaces.new': 'Новое рабочее пространство',
    'spaces.description.placeholder': 'Описание рабочего пространства',
    'spaces.access': 'Доступ',
    'spaces.access.private': 'Приватное',
    'spaces.access.public': 'Публичное',
    'spaces.access.restricted': 'Ограниченный доступ',
    'spaces.share': 'Поделиться',
    'spaces.members': 'Участники',
    'spaces.workspace': 'Пространство',

    // People
    'people.title': 'Персоны',
    'people.relationships': 'Связи',
    'people.contact': 'Контактная информация',
    'people.social': 'Соц сети',
    'people.email': 'Email',
    'people.phone': 'Телефон',
    'places.title': 'Места',
    'clusters.title': 'Клвстеры',

    // Tasks
    'tasks.title': 'Мои задачи',
    'tasks.new': 'Новая задача',
    'tasks.open': 'Открыто',
    'tasks.inProgress': 'В процессе',
    'tasks.completed': 'Завершено',
    'tasks.canceled': 'Отменено',
    'tasks.assignee': 'Исполнитель',
    'tasks.priority': 'Приоритет',
    'tasks.dueDate': 'Срок выполнения',

    // Events
    'events.title': 'События',
    'events.new': 'Новое событие',
    'events.today': 'Сегодня',
    'events.thisWeek': 'На этой неделе',
    'events.thisMonth': 'В этом месяце',
    'events.thisYear': 'В этом году',
    'events.participants': 'Участники',
    'events.startDate': 'Дата начала',
    'events.endDate': 'Дата окончания',

    // Profile
    'profile.title': 'Профиль',
    'profile.edit': 'Редактировать профиль',
    'profile.details': 'Детали',
    'profile.activity': 'Активность',
    'profile.firstName': 'Имя',
    'profile.lastName': 'Фамилия',
    'profile.username': 'Имя пользователя',
    'profile.telegramId': 'Telegram ID',
    'profile.settings': 'Настройки',

    // Whiteboard
    'whiteboard.addPerson': 'Добавить человека',
    'whiteboard.addOrganization': 'Добавить организацию',
    'whiteboard.addText': 'Добавить текст',
    'whiteboard.createConnection': 'Создать связь',
    'whiteboard.editElement': 'Редактировать элемент',
    'whiteboard.editConnection': 'Редактировать связь',
    'whiteboard.connectionLabel': 'Название связи',
    'whiteboard.color': 'Цвет',
    'whiteboard.elementAdded': 'Элемент добавлен',
    'whiteboard.connectionCreated': 'Связь создана',
    'whiteboard.elementDeleted': 'Элемент удален',
    'whiteboard.connectionDeleted': 'Связь удалена',

    // Settings
    'settings.title': 'Настройки профиля',
    'settings.subtitle': 'Управляйте настройками вашего профиля',
    'settings.theme': 'Тема',
    'settings.language': 'Язык',
    'settings.light': 'Светлая',
    'settings.dark': 'Темная',
    'settings.system': 'Системная',
    'settings.russian': 'Русский',
    'settings.english': 'English',
    'settings.theme.description': 'Выберите тему оформления приложения',
    'settings.language.description': 'Выберите язык интерфейса',
    'settings.saved': 'Настройки сохранены',
    'settings.notifications.updated': 'Настройки уведомлений обновлены',
    'settings.languageChanged': 'Язык изменен',
    'settings.languageChangedToRu': 'Язык интерфейса изменен на русский',
    'settings.languageChangedToEn': 'Язык интерфейса изменен на английский',
    'settings.themeChanged': 'Тема изменена',
    'settings.themeChangedTo': 'Установлена {{theme}} тема',
    // Notifications
    'settings.notifications.taskReminders': 'Напоминания о задачах',
    'settings.notifications.taskRemindersDesc': 'Уведомления о приближающихся сроках выполнения задач',
    'settings.notifications.taskRemindersMobileDesc': 'Уведомления о сроках задач',
    'settings.notifications.eventReminders': 'Напоминания о событиях',
    'settings.notifications.eventRemindersDesc': 'Уведомления о предстоящих событиях и встречах',
    'settings.notifications.eventRemindersMobileDesc': 'Уведомления о предстоящих событиях',

    // Person Creation Dialog
    'personCreation.title': 'Создать новый элемент',
    'personCreation.chooseType': 'Выберите тип элемента для создания',
    'personCreation.personTab': 'Человек',
    'personCreation.placeTab': 'Место',
    'personCreation.clusterTab': 'Кластер',
    'personCreation.personName': 'Имя',
    'personCreation.personNamePlaceholder': 'Введите имя',
    'personCreation.personDescriptionPlaceholder': 'Описание человека',
    'personCreation.avatar': 'Аватар',
    'personCreation.preview': 'Превью',
    'personCreation.placeName': 'Название',
    'personCreation.placeNamePlaceholder': 'Введите название места',
    'personCreation.placeDescriptionPlaceholder': 'Описание места',
    'personCreation.image': 'Изображение',
    'personCreation.clusterName': 'Название',
    'personCreation.clusterNamePlaceholder': 'Введите название кластера',
    'personCreation.clusterDescriptionPlaceholder': 'Описание кластера',
    'personCreation.members': 'Участники',
    'personCreation.selectMembers': 'Выберите участников',
    'personCreation.selectedMembers': 'Выбранные участники:',
    'personCreation.personCreated': 'Персона создана',
    'personCreation.placeCreated': 'Место создано',
    'personCreation.clusterCreated': 'Кластер создан',
  },
  En: {
    // Navigation
    'nav.spaces': 'Workspaces',
    'nav.people': 'People',
    'nav.tasks': 'Tasks',
    'nav.events': 'Events',
    'nav.profile': 'Profile',

    // Common
    'common.back': 'Back',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.create': 'Create',
    'common.search': 'Search',
    'common.loading': 'Loading...',
    'common.name': 'Name',
    'common.description': 'Description',
    'common.date': 'Date',
    'common.location': 'Location',
    'common.type': 'Type',
    'common.status': 'Status',
    'common.showAll': 'Show All',

    // Spaces
    'spaces.title': 'My Workspaces',
    'spaces.available': 'Available Workspaces',
    'spaces.create': 'Create Workspace',
    'spaces.new': 'New Workspace',
    'spaces.description.placeholder': 'Workspace description',
    'spaces.access': 'Access',
    'spaces.access.private': 'Private',
    'spaces.access.public': 'Public',
    'spaces.access.restricted': 'Restricted Access',
    'spaces.share': 'Share',
    'spaces.members': 'Members',
    'spaces.workspace': 'Workspace',

    // People
    'people.title': 'People',
    'people.relationships': 'Relationships',
    'people.contact': 'Contact Information',
    'people.social': 'Social Networks',
    'people.email': 'Email',
    'people.phone': 'Phone',
    'places.title': 'Places',
    'clusters.title': 'Clusters',

    // Tasks
    'tasks.title': 'My Tasks',
    'tasks.new': 'New Task',
    'tasks.open': 'Open',
    'tasks.inProgress': 'In Progress',
    'tasks.completed': 'Completed',
    'tasks.canceled': 'Canceled',
    'tasks.assignee': 'Assignee',
    'tasks.priority': 'Priority',
    'tasks.dueDate': 'Due Date',

    // Events
    'events.title': 'Events',
    'events.new': 'New Event',
    'events.today': 'Today',
    'events.thisWeek': 'This Week',
    'events.thisMonth': 'This Month',
    'events.thisYear': 'This Year',
    'events.participants': 'Participants',
    'events.startDate': 'Start Date',
    'events.endDate': 'End Date',

    // Profile
    'profile.title': 'Profile',
    'profile.edit': 'Edit Profile',
    'profile.details': 'Details',
    'profile.activity': 'Activity',
    'profile.firstName': 'First Name',
    'profile.lastName': 'Last Name',
    'profile.username': 'Username',
    'profile.telegramId': 'Telegram ID',
    'profile.settings': 'Settings',

    // Whiteboard
    'whiteboard.addPerson': 'Add Person',
    'whiteboard.addOrganization': 'Add Organization',
    'whiteboard.addText': 'Add Text',
    'whiteboard.createConnection': 'Create Connection',
    'whiteboard.editElement': 'Edit Element',
    'whiteboard.editConnection': 'Edit Connection',
    'whiteboard.connectionLabel': 'Connection Label',
    'whiteboard.color': 'Color',
    'whiteboard.elementAdded': 'Element Added',
    'whiteboard.connectionCreated': 'Connection Created',
    'whiteboard.elementDeleted': 'Element Deleted',
    'whiteboard.connectionDeleted': 'Connection Deleted',

    // Settings
    'settings.title': 'Profile Settings',
    'settings.subtitle': 'Manage your profile settings',
    'settings.theme': 'Theme',
    'settings.language': 'Language',
    'settings.light': 'Light',
    'settings.dark': 'Dark',
    'settings.system': 'System',
    'settings.russian': 'Русский',
    'settings.english': 'English',
    'settings.theme.description': 'Choose your preferred app theme',
    'settings.language.description': 'Choose your interface language',
    'settings.saved': 'Settings saved',
    'settings.notifications.updated': 'Notification settings updated',
    'settings.languageChanged': 'Language changed',
    'settings.languageChangedToRu': 'Interface language changed to Russian',
    'settings.languageChangedToEn': 'Interface language changed to English',
    'settings.themeChanged': 'Theme changed',
    'settings.themeChangedTo': '{{theme}} theme set',
    // Notifications
    'settings.notifications.taskReminders': 'Task reminders',
    'settings.notifications.taskRemindersDesc': 'Notifications about upcoming task deadlines',
    'settings.notifications.taskRemindersMobileDesc': 'Task deadline notifications',
    'settings.notifications.eventReminders': 'Event reminders',
    'settings.notifications.eventRemindersDesc': 'Notifications about upcoming events and meetings',
    'settings.notifications.eventRemindersMobileDesc': 'Upcoming event notifications',

    // Person Creation Dialog
    'personCreation.title': 'Create New Item',
    'personCreation.chooseType': 'Select the type of item to create',
    'personCreation.personTab': 'Person',
    'personCreation.placeTab': 'Place',
    'personCreation.clusterTab': 'Cluster',
    'personCreation.personName': 'Name',
    'personCreation.personNamePlaceholder': 'Enter name',
    'personCreation.personDescriptionPlaceholder': 'Person description',
    'personCreation.avatar': 'Avatar',
    'personCreation.preview': 'Preview',
    'personCreation.placeName': 'Title',
    'personCreation.placeNamePlaceholder': 'Enter place name',
    'personCreation.placeDescriptionPlaceholder': 'Place description',
    'personCreation.image': 'Image',
    'personCreation.clusterName': 'Title',
    'personCreation.clusterNamePlaceholder': 'Enter cluster name',
    'personCreation.clusterDescriptionPlaceholder': 'Cluster description',
    'personCreation.members': 'Members',
    'personCreation.selectMembers': 'Select members',
    'personCreation.selectedMembers': 'Selected members:',
    'personCreation.personCreated': 'Person created',
    'personCreation.placeCreated': 'Place created',
    'personCreation.clusterCreated': 'Cluster created',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(Language.Ru);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === Language.Ru || savedLanguage === Language.En)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

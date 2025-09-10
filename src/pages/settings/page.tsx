import { useState, useEffect } from 'react';
import { ChevronLeft, Bell, Globe, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageLayout } from '@/components/layout/page-layout';
import { useMobile } from '@/hooks/use-mobile';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/app/language-context.tsx';
import { routes } from '@/utils/consts/routes.ts';
import { Language, Theme } from '@/utils/api/types';
import { useTheme } from '@/components/theme-provider.tsx';
import { usePutEditUserSettings } from '@/utils/api/hooks/UserSettings/usePutEditUserSettings';
import { useGetUserSettings } from '@/utils/api/hooks/UserSettings/useGetUserSettings';

interface NotificationSettings {
  taskReminders: boolean;
  eventReminders: boolean;
}

interface NotificationItem {
  key: keyof NotificationSettings;
  label: string;
  desc: string;
}

interface MobileSettingsProps {
  t: (key: string) => string;
  language: Language;
  theme: Theme;
  notifications: NotificationSettings;
  notificationItems: NotificationItem[];
  handleLanguageChange: (lang: Language) => void;
  handleThemeChange: (theme: Theme) => void;
  handleNotificationChange: (key: keyof NotificationSettings, value: boolean) => void;
}

const MobileSettings = ({
  t,
  language,
  theme,
  notifications,
  notificationItems,
  handleLanguageChange,
  handleThemeChange,
  handleNotificationChange,
}: MobileSettingsProps) => (
  <div className="pb-20">
    <div className="sticky top-0 bg-background border-b z-10">
      <div className="flex items-center p-4">
        <Button
          variant="ghost"
          size="sm"
          className="mr-4"
          asChild
        >
          <Link to={routes.profile()}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            {t('common.back')}
          </Link>
        </Button>
        <h1 className="text-xl font-bold">{t('settings.title')}</h1>
      </div>
    </div>
    <div className="p-4 space-y-6">
      <Card className="border border-border rounded-xl shadow-sm bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg">
            <Globe className="h-5 w-5 text-primary" />
            {t('settings.language')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            value={language}
            onValueChange={handleLanguageChange}
          >
            <SelectTrigger className="w-full h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Language.Ru}>Русский</SelectItem>
              <SelectItem value={Language.En}>English</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card className="border border-border rounded-xl shadow-sm bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg">
            <Palette className="h-5 w-5 text-primary" />
            {t('settings.theme')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            value={theme}
            onValueChange={handleThemeChange}
          >
            <SelectTrigger className="w-full h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Theme.Dark}>Темная</SelectItem>
              <SelectItem value={Theme.Light}>Светлая</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card className="border border-border rounded-xl shadow-sm bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg">
            <Bell className="h-5 w-5 text-primary" />
            Уведомления
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {notificationItems.map((item) => (
            <div
              className="flex items-center justify-between"
              key={item.key}
            >
              <div className="space-y-1">
                <Label className="text-base font-medium">{item.label}</Label>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
              <Switch
                checked={notifications[item.key]}
                onCheckedChange={(checked) => handleNotificationChange(item.key, checked)}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  </div>
);

interface DesktopSettingsProps {
  t: (key: string) => string;
  language: Language;
  theme: Theme;
  notifications: NotificationSettings;
  notificationItems: NotificationItem[];
  handleLanguageChange: (lang: Language) => void;
  handleThemeChange: (theme: Theme) => void;
  handleNotificationChange: (key: keyof NotificationSettings, value: boolean) => void;
}

const DesktopSettings = ({
  t,
  language,
  theme,
  notifications,
  notificationItems,
  handleLanguageChange,
  handleThemeChange,
  handleNotificationChange,
}: DesktopSettingsProps) => (
  <PageLayout currentPage="profile">
    <div className="p-8 overflow-auto">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4"
            asChild
          >
            <Link to={routes.profile()}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              {t('common.back')}
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{t('settings.title')}</h1>
          <p className="text-muted-foreground mt-2">{t('settings.subtitle')}</p>
        </div>
        <div className="space-y-6">
          <Card className="border border-border rounded-xl shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-primary" />
                {t('settings.language')}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{t('settings.language.description')}</p>
            </CardHeader>
            <CardContent>
              <Select
                value={language}
                onValueChange={handleLanguageChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Language.Ru}>Русский</SelectItem>
                  <SelectItem value={Language.En}>English</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          <Card className="border border-border rounded-xl shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Palette className="h-5 w-5 text-primary" />
                {t('settings.theme')}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{t('settings.theme.description')}</p>
            </CardHeader>
            <CardContent>
              <Select
                value={theme}
                onValueChange={handleThemeChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Theme.Light}>{t('settings.light')}</SelectItem>
                  <SelectItem value={Theme.Dark}>{t('settings.dark')}</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          <Card className="border border-border rounded-xl shadow-sm bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-primary" />
                Уведомления
              </CardTitle>
              <p className="text-sm text-muted-foreground">Настройте типы уведомлений, которые хотите получать</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {notificationItems.map((item) => (
                <div
                  className="flex items-center justify-between"
                  key={item.key}
                >
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium">{item.label}</Label>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key]}
                    onCheckedChange={(checked) => handleNotificationChange(item.key, checked)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </PageLayout>
);

export const SettingsPage = () => {
  const isMobile = useMobile();
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const { data: userSettings } = useGetUserSettings({});

  const [notifications, setNotifications] = useState<NotificationSettings>({
    taskReminders: true,
    eventReminders: true,
  });

  useEffect(() => {
    if (userSettings) {
      if (userSettings.languageCode && userSettings.languageCode !== language) {
        setLanguage(userSettings.languageCode);
      }
      if (userSettings.theme && userSettings.theme !== theme) {
        setTheme(userSettings.theme);
      }
      setNotifications({
        taskReminders: userSettings.taskReminders ?? true,
        eventReminders: userSettings.eventReminders ?? true,
      });
    }
  }, [userSettings]);

  const putEditUserSettings = usePutEditUserSettings();

  const sendSettings = (newSettings: { language?: Language; theme?: Theme; notifications?: NotificationSettings }) => {
    putEditUserSettings.mutate({
      params: {
        theme: newSettings.theme ?? theme,
        languageCode: newSettings.language ?? language,
        taskReminders: (newSettings.notifications ?? notifications).taskReminders,
        eventReminders: (newSettings.notifications ?? notifications).eventReminders,
      },
    });
  };

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
    const updated = { ...notifications, [key]: value };
    setNotifications(updated);
    toast({
      title: t('settings.saved'),
      description: t('settings.notifications.updated'),
    });

    sendSettings({ notifications: updated });
  };

  const handleLanguageChange = (newLanguage: Language) => {
    const lang = newLanguage === Language.Ru ? Language.Ru : Language.En;
    setLanguage(lang);

    const translations = {
      Ru: {
        title: 'Язык изменен',
        desc: 'Язык интерфейса изменен на русский',
      },
      En: {
        title: 'Language changed',
        desc: 'Interface language changed to English',
      },
    };
    const toastLang = translations[lang];

    toast({
      title: toastLang.title,
      description: toastLang.desc,
    });

    sendSettings({ language: lang });
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    const themeNames = {
      [Theme.Light]: t('settings.light'),
      [Theme.Dark]: t('settings.dark'),
    };

    const themeDesc =
      language === Language.En
        ? `${themeNames[newTheme]} ${t('settings.theme').toLowerCase()} ${t('settings.themeChangedTo').replace('{{theme}}', '').trim()}`
        : t('settings.themeChangedTo', { theme: themeNames[newTheme] });

    toast({
      title: t('settings.themeChanged'),
      description: themeDesc,
    });
    sendSettings({ theme: newTheme });
  };

  const notificationItems: NotificationItem[] = [
    {
      key: 'taskReminders',
      label: t('settings.notifications.taskReminders'),
      desc: isMobile
        ? t('settings.notifications.taskRemindersMobileDesc')
        : t('settings.notifications.taskRemindersDesc'),
    },
    {
      key: 'eventReminders',
      label: t('settings.notifications.eventReminders'),
      desc: isMobile
        ? t('settings.notifications.eventRemindersMobileDesc')
        : t('settings.notifications.eventRemindersDesc'),
    },
  ];

  if (isMobile) {
    return (
      <MobileSettings
        t={t}
        language={language}
        theme={theme}
        notifications={notifications}
        notificationItems={notificationItems}
        handleLanguageChange={handleLanguageChange}
        handleThemeChange={handleThemeChange}
        handleNotificationChange={handleNotificationChange}
      />
    );
  }

  return (
    <DesktopSettings
      t={t}
      language={language}
      theme={theme}
      notifications={notifications}
      notificationItems={notificationItems}
      handleLanguageChange={handleLanguageChange}
      handleThemeChange={handleThemeChange}
      handleNotificationChange={handleNotificationChange}
    />
  );
};

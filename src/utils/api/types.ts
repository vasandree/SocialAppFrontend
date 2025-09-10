export interface LoginDto {
  initData: string;
}

export interface UserDto {
  id: string;
  telegramId: number;
  firstName?: string;
  lastName?: string;
  userName: string;
  photoUrl?: string;
  languageCode: string;
}

export interface TokensDto {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  tokens: TokensDto;
  userSettings: UserSettingsDto;
}

export interface Pagination {
  size: number;
  count: number;
  current: number;
}

export interface ListedBaseSocialNodeDto {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface ClustersDto {
  clusters: ListedBaseSocialNodeDto[];
  pagination: Pagination;
}

export interface BaseSocialNodeDto {
  id: string;
  name: string;
  description?: string;
  avatarUrl?: string;
}

export interface PersonDto extends BaseSocialNodeDto {
  email: string;
  phoneNumber: string;
}

export interface ClusterDto extends BaseSocialNodeDto {
  persons: PersonDto[];
}

export interface EventTypeDto {
  id: string;
  name: string;
}

export interface EventDto {
  id: string;
  name: string;
  location: string;
  evenType: EventTypeDto;
  date: Date;
  socialNode: BaseSocialNodeDto;
  workspaceId: string;
}

export interface ListedEventDto {
  id: string;
  name: string;
  location: string;
  evenType: EventTypeDto;
  date: Date;
}

export interface PersonsPaginatedDto {
  person: ListedBaseSocialNodeDto[];
  pagination: Pagination;
}

export interface SocialNetworkDto {
  id: string;
  type: SocialNetwork;
  url: string;
  username: string;
}

export enum SocialNetwork {
  Facebook = 'Facebook',
  Twitter = 'Twitter',
  LinkedIn = 'LinkedIn',
  Instagram = 'Instagram',
  YouTube = 'YouTube',
  Pinterest = 'Pinterest',
  Snapchat = 'Snapchat',
  TikTok = 'TikTok',
  Reddit = 'Reddit',
  WhatsApp = 'WhatsApp',
  GitHub = 'GitHub',
  Telegram = 'Telegram',
  Twitch = 'Twitch',
  Vk = 'Vk',
}

export interface PlacesDto {
  place: ListedBaseSocialNodeDto[];
  pagination: Pagination;
}

export interface ListedTaskDto {
  id: string;
  name: string;
  endDate: Date;
  socialNode: ListedBaseSocialNodeDto;
}

export interface TasksDto {
  openTasks: ListedTaskDto[];
  inProgressTasks: ListedTaskDto[];
  completedTasks: ListedTaskDto[];
  cancelledTasks: ListedTaskDto[];
}

export interface TaskDto {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  status: StatusOfTask;
  socialNodeId: string;
  workspaceId: string;
}

export enum StatusOfTask {
  Created = 'Created',
  InProgress = 'InProgress',
  Done = 'Done ',
  Cancelled = 'Cancelled',
}

export interface UserSettingsDto {
  theme: Theme;
  languageCode: Language;
  taskReminders: boolean;
  eventReminders: boolean;
}

export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

export enum Language {
  En = 'En',
  Ru = 'Ru',
}

export interface ListedWorkspaceDto {
  id: string;
  name: string;
  description?: string;
}

export interface WorkspacesDto {
  workspaces: ListedWorkspaceDto[];
  pagination: Pagination;
}

export interface WorkspaceInfoDto {
  workspaceId: string;
  name: string;
  description?: string;
  content: JSON;
}

export interface WorkspaceDto {
  info: WorkspaceInfoDto;
  tasks: TasksDto[];
  events: ListedEventDto[];
}

export interface CreateSocialNodeForm {
  name: string;
  description?: string;
  avatar?: File;
}

export interface CreateClusterForm extends CreateSocialNodeForm {
  users?: string[];
}

export interface CreatePersonForm extends CreateSocialNodeForm {
  email: string;
  phoneNumber: string;
}

export type CreatePlaceForm = CreateSocialNodeForm;

export interface EditPersonSocialNetworkAccountDto {
  username: string;
}

export interface CreateSocialNetworkAccountDto {
  type: SocialNetwork;
  username: string;
}

export interface CreateEventDto {
  title: string;
  description?: string;
  location: string;
  evenTypeId: string;
  date: Date;
  socialNodeId: string[];
  workspaceId: string;
}

export interface CreateTaskDto {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  socialNodeId: string;
  workspaceId: string;
}

export interface CreateWorkspaceDto {
  name: string;
  description?: string;
}

export interface EditEventDto {
  title: string;
  description?: string;
  location: string;
  evenTypeId: string;
  date: Date;
  socialNodeId: string[];
}

export interface CreateEventTypeDto {
  name: string;
}

export interface RelationDto {
  id: string;
  name: string;
  description?: string;
  color: string;
}

export interface CreateRelationDto {
  name: string;
  description?: string;
  color: string;
  firstUnit: string;
  secondUnit: string;
  workspaceId: string;
}

export interface EditRelationDto {
  name: string;
  description?: string;
  color: string;
}

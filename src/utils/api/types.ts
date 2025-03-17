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

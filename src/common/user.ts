export interface LoginUserParam {
  email: string;
  password: string;
}

export interface RegisterUserParam {
  email: string;
  nickname: string;
  password: string;
  checkPassword: string;
}

export interface UserInfo {
  id: number;
  nickname: string;
  email: string;
  role: string;
  userAvatar: string;
  userProfile: string | null;
  createTime: Date | null;
  updateTime: Date | null;
  isUserBan: boolean;
}

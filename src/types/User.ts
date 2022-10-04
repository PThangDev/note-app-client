import { ActiveToken } from './Common';

export type UserRole = 'customer' | 'admin';
export type UserStatus = 'pending' | 'active' | 'banned';
export interface User {
  _id: string;
  fullname: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
  slug: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  total_topics?: number;
  total_notes?: number;
  __v: number;
}

export interface UserLogin {
  account: string;
  password: string;
}
export interface UserRegister {
  username: string;
  email: string;
  password: string;
}

export interface UserRegisterResponse extends ActiveToken {
  url: string;
}

export interface UserForgotPassword {
  email: string;
}

export type ForgotPasswordResponse = User;

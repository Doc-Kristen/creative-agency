export interface IUserBase {
  username: string;
  img?: string;
  id: string;
}

export interface IUser extends IUserBase {
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: string;
}

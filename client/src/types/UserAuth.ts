import type { IUser } from "./User";

export interface IUserAuth{
  user: IUser,
  token: string
}
import { User } from "../userModel";

export interface IAdminLogin{
    email:string;
    password:string;
}
export interface UsersResponse {
    success: boolean;
    message: string;
    data: User[];
  }
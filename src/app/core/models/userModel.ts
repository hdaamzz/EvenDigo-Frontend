

export interface User{
    userId:string;
    _id:string;
    name:string;
    email:string;
    password:string;
    role?:string;
    mobile?:string;
    status?:string;
    imageUrl?:string;
    gender?:string;
    dateOfBirth?:string;
    rating?:number;
}


export interface IRegister{
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
}

export interface ILogin{
    email:string;
    password:string;
}


export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
  }
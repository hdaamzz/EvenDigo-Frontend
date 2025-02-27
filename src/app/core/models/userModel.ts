

export interface User{
    _id:string;
    name:string;
    email:string;
    password?:string;
    role?:string;
    mobile?:string;
    status?:string;
    firebaseUid?:string;
    profileImg?:string;
    provider?:string
    gender?:string;
    dateOfBirth?:string;
    rating?:number;
    createdAt?:string
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
    isAuthenticated: boolean;
}
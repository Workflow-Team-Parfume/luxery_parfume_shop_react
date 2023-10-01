export enum AuthUserActionType {
    LOGIN_USER = "AUTH_LOGIN_USER",
    LOGIN_GOOGLE_USER = "AUTH_LOGIN_GOOGLE_USER",
    LOGOUT_USER = "AUTH_LOGOUT_USER",
  }
  
  export interface IUser {
    id: string;
    userName: string;
    email: string;
    profilePicture: string;
    registrationDate: Date;
    phoneNumber: string;
    roles: string[];
  }
  
  export interface IUserEdit {
    userName: string;
    email: string;
    phoneNumber: string;
    profilePicture: File | null;
  }
  
  export interface IAuthUser {
    isAuth: boolean;
    isGoogle: boolean;
    user?: IUser;
  }
export interface IRegister {
    userName: string;
    email: string;
    phoneNumber: string;
    password: string;
    passwordConfirmation: string;
  }
  
  export interface ILogin {
    email: string;
    password: string;
  }
  
  export interface ILoginResult {
    access_token: string;
  }
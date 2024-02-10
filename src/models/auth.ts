import { Response } from './responseApi';

export enum Roles {
  ADMIN = 'admin',
  PUBLIC = 'public',
}

export interface FormValues {
  email: string;
  password: string;
}
export interface UserValue {
  age: string;
  email: string;
  id: string;
  lastname: string;
  name: string;
  position: string;
  signature: string;
  isLogger: boolean;

  rol: Roles;
}

export interface AuthContextType {
  user?: UserValue;
  login: (values: FormValues) => Promise<boolean>;
  logout: () => void;
}

export interface PayloadAuth {
  payload: {
    token: string;
    user: UserValue;
  };
  response: Response;
}

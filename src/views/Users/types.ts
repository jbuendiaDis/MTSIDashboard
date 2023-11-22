import { Response } from '../../models';

export interface DataUsers {
  age: string;
  email: string;
  lastname: string;
  name: string;
  position: string;
  signature: string;
  _id: string;
}

export interface PaylaodUsers {
  data: DataUsers;
}

export interface Payload {
  payload: PaylaodUsers;
  response: Response;
}

export interface FormCreateUserValues {
  _id?: string;
  name: string;
  lastname: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  position: string;
  signature: string;
}

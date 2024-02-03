import { Response } from '../../models';

export interface DataFormatUsers {
  age: string;
  email: string;
  lastname: string;
  name: string;
  position: string;
  signature: [];
  _id: string;
}
export interface DataUsers {
  age: string;
  email: string;
  lastname: string;
  name: string;
  position: string;
  signature: [] | string;
  confirmSignature?: string;
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
  signature?: any;
}

export interface SignatureItem {
  url: string;
  file: File;
  base64?: string;
}

export interface FormDataWithBase64 {
  _id: string;
  name: string;
  lastname: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  position: string;
  signature: string;
}

import { Response } from '../../models/responseApi';
import { Action } from '../../models/table';


export interface ColumnsTable {
  id: string,
  label: string,
  align: string,
  actions?:Action[]
}

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

import { Response } from './responseApi';

export interface DataStates {
  data: Array<{ [key: string]: string }>;
}

export interface ResponseStates {
  response: Response;
  payload: DataStates;
}

export interface FormatDataState {
  codigo: number;
  label: string;
  // _id: string;
}

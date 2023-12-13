import { Response } from '../../models';

export interface Transfer {
  concepto: string;
  sueldo: number;
  tipoTraslado: string;
  _id: string;
}

export interface PayloadData {
  data: Transfer[];
}

export interface ResponseTransfer {
  payload: PayloadData;
  response: Response;
}

export interface Options {
  label: string;
  value: string;
}

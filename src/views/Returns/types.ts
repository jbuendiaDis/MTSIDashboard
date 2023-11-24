import { Response } from '../../models';

export interface PayloadData {
  marca: string;
  modelo: string;
  rendimiento: number;
  __v?: number;
  _id: string;
}

export interface ResponseReturns {
  payload: PayloadData;
  response: Response;
}

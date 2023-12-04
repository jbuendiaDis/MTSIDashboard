import { Response } from '../../models';

export interface DataReturns {
  marca: string;
  modelo: string;
  rendimiento: number;
  __v?: number | undefined;
  _id?: string;
}

export interface PayloadDataReturns {
  data: DataReturns[];
}

export interface ResponseReturns {
  payload: PayloadDataReturns;
  response: Response;
}

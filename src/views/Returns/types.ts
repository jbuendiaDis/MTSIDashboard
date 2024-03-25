import { Response } from '../../models';

export interface DataReturns {
  vehicleCondition: string;
  bodyStyle: string;
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

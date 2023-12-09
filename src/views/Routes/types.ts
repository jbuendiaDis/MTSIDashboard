import { Response } from '../../models';

interface Puntos {
  costo: number;
  nombreCaseta: string;
  _id: string;
}

export interface DataTolls {
  casetas?: string;
  idgasto: string;
  kms: number;
  puntos: Puntos[];
  totalPeajes: number;
  localidadDestino?: string;
  localidadOrigen?: string;
  tipoUnidad?: string;
  __v?: number;
  _id: string;
}

export interface PayloadDataTolls {
  data: DataTolls[];
}

export interface ResponseTolls {
  payload: PayloadDataTolls;
  response: Response;
}
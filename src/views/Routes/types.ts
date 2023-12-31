import { FormatDataState, Response } from '../../models';

export interface Puntos {
  costo: number;
  nombreCaseta: string;
  _id: string;
  casetas: string;
}

export interface DataTolls {
  idEstadoDestino: number;
  idEstadoOrigen: number;
  casetas: string;
  idgasto: string;
  kms: number;
  puntos: Puntos[];
  totalPeajes: number;
  localidadDestino: string;
  localidadOrigen: string;
  nombreOrigen: string;
  nombreDestino: string;
  tipoUnidad: string;
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

export type Options = {
  label: string;
  value: string;
};

export interface TableDots {
  casetas?: string;
  nombreCaseta: string;
  costo: string | number;
  _id: number;
}

export interface DataUnidades {
  descripcion: string;
  fechaCreacion: string;
  idPadre: string;
  __v: number;
  _id: string;
}

export interface PayloadUnidades {
  data: DataUnidades[];
}

export interface ResponseUnidades {
  payload: PayloadUnidades;
  response: Response;
}

export interface FormValues {
  tipoUnidad: string;
  localidadOrigen: number | null | FormatDataState;
  localidadDestino: number | null | FormatDataState;
  kms: null | string | number;
  stateOrigen: null | FormatDataState;
  stateDestino: null | FormatDataState;

  pagoCasetas?: string;
  stateCaseta?: null;
  nombreCaseta?: null;
  _id?: string;
}

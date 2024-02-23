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

interface Localidad {
  _id: string;
  codigo: number;
  estado: number;
  coordenadas: [number, number];
  nombre: string;
  tipoUnidad: string;
  fechaCreacion: string;
  __v: number;
  costo: number;
  fechaActualizacion: string;
}

export interface FormValues {
  tipoUnidad: string;
  localidadOrigen: Localidad | null;
  localidadDestino: Localidad | null;
  kms: null | string | number;
  stateOrigen: null | FormatDataState;
  stateDestino: null | FormatDataState;

  _id?: string;
}

export interface DataRoutesWithoutExpenses {
  _id: string;
  localidadOrigen: string;
  localidadDestino: string;
  kms: number;
  tipoUnidad: string;
  puntos: Puntos[];
  totalPeajes: number;
  __v: number;
  nombreOrigen: string;
  nombreDestino: string;
}

export interface PayloadRoutesWithoutExpenses {
  data: DataRoutesWithoutExpenses[];
}

export interface ResponseRoutesWithoutExpenses {
  response: Response;
  payload: PayloadRoutesWithoutExpenses;
}

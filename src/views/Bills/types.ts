import { Response } from '../../models/responseApi';

export interface FormValues {
  comidas: number | string;
  hoteles: number | string;
  pasajeOrigen: number | string;
  pasajeDestino: number | string;
}

interface Points {
  casetas: string;
  costo: number;
  nombreCaseta: string;
  _id: string;
}

interface Tolls {
  idgasto: string;
  kms: number;
  localidadDestino: string;
  localidadOrigen: string;
  puntos: Points[];
  tipoUnidad: string;
  totalPeajes: number;
  __v: number;
  _id: string;
}

export interface FormaterDataTollExpenses {
  comidas: string;
  destino: string;
  estadoDestino: string;
  estadoOrigen: string;
  hoteles: string;
  idCliente: string;
  localidadDestino: string;
  localidadOrigen: string;
  origen: string;
  pasajeDestino: string;
  pasajeOrigen: string;
  peajes: Tolls[];
  totalKilometers: string;
  totalPeajes: string;
  __v: number;
  _id: string;
}

export interface TollExpensesData {
  data: {
    comidas: number;
    hoteles: number;
    pasajeOrigen: number;
    pasajeDestino: number;
    destino: string;
    estadoDestino: string;
    estadoOrigen: string;
    idCliente: string;
    localidadDestino: string;
    localidadOrigen: string;
    origen: string;
    peajes: Tolls[];
    __v: number;
    _id: string;
  };
}

export interface PayloadTollExpenses {
  data: {
    comidas: number;
    hoteles: number;
    pasajeOrigen: number;
    pasajeDestino: number;
    destino: string;
    estadoDestino: string;
    estadoOrigen: string;
    idCliente: string;
    localidadDestino: string;
    localidadOrigen: string;
    origen: string;
    peajes: Tolls[];
    __v?: number;
    _id: string;
  }[];
}

export interface ResponseTollExpenses {
  payload: PayloadTollExpenses;
  response: Response;
}

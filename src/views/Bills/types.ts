import { Response } from '../../models/responseApi';

interface Points {
  costo: number;
  nombreCaseta: string;
  _id: string;
}

interface Tolls {
  casetas: string;
  idgasto: string;
  kms: number;
  puntos: Points[];
  totalPeajes: number;
  __v?: number;
  _id: string;
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
  }[];
}

export interface ResponseTollExpenses {
  payload: PayloadTollExpenses;
  response: Response;
}

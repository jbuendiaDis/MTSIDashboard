import { Response } from '../../models/responseApi';

export interface PayloadData {
  comidas: number;
  destino: string;
  estadoDestino: string;
  estadoOrigen: string;
  hoteles: number;
  idCliente: string;
  localidadDestino: string;
  localidadOrigen: string;
  origen: string;
  pasajeDestino: number;
  pasajeOrigen: number;
  peajes: any[];
}

export interface FormaterData {
  comidas: string;
  hoteles: string;
  pasajeOrigen: string;
  pasajeDestino: string;
  destino: string;
  estadoDestino: string | number;
  estadoOrigen: string | number;
  idCliente: string;
  localidadDestino: string;
  localidadOrigen: string;
  origen: string;
  peajes: any[];
}

export interface PayloadBills {
  payload: PayloadData;
  response: Response;
}

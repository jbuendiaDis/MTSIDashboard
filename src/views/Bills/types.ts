import { Response } from '../../models/responseApi';
export interface FormValues {
  routes: any;
  comidas: number | string;
  hoteles: number | string;
  pasajeOrigen: number | string;
  pasajeDestino: number | string;
  ferri: number | string;
  flight: number | string;
  stayPayment: number | string;
  transferInsurance: number | string; //SEguro de traslado
  taxi: number | string;
  portRelease: number | string; //Liberacion de puerto
  talachas: number | string;
  phytoSanitary: number | string;
  urea: number | string;
  udsUsa: number | string;
  extra: string | number;
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
    nombreDestino: string;
    estadoDestino: string;
    estadoOrigen: string;
    idCliente: string;
    localidadDestino: string;
    localidadOrigen: string;
    nombreOrigen: string;
    peajes: Tolls[];
    __v: number;
    _id: string;
  };
}
export interface DataTollExpenses {
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
  extra: number;
  fitosanitarias: number;
  rutaId: string;
  talachas: number;
  taxi: number;
  udsUsa: number;
  urea: number;
  vuelo: number;
  __v?: number;
  _id: string;
}
export interface PayloadTollExpenses {
  data: DataTollExpenses[];
}
export interface ResponseTollExpenses {
  payload: PayloadTollExpenses;
  response: Response;
}

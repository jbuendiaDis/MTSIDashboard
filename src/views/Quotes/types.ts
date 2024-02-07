import { Response } from '../../models';

interface DataQuotez {
  clientName: string;
  destinoId: number;
  estatus: string;
  fechaCreacion: string;
  folio: number;
  origenId: number;
  tipoTraslado: number;
  tipoUnidad: number;
  tipoViaje: number;
  userId: string;
  _id: string;
}

export interface PayloadQuotez {
  data: DataQuotez[];
}

export interface ResponseQuotes {
  payload: PayloadQuotez;
  response: Response;
}

interface DataConfigure {
  rendimiento: number;
  combustible: number;
  inflacion: number;
  financiamiento: number;
  otros: number;
  sucontrato: number;
  status: string;
  horaCreacion: string;
  _id: string;
  fechaCreacion: string;
  __v: number;
}
export interface PayloadConfigureData {
  data: DataConfigure;
}
export interface ResponseConfigureData {
  payload: PayloadConfigureData;
  response: Response;
}

export interface FormValues {
  rendimiento: string | number | undefined;
  combustible: string | number | undefined;
  inflacion: string | number | undefined;
  financiamiento: string | number | undefined;
  otros: string | number | undefined;
  sucontrato: string | number | undefined;
  _id?: string;
}

interface DataDetailQuote {
  id: string;
  folio: number;
  origen: string;
  destino: string;
  kms: number;
  rendimiento: number;
  litros: number;
  diesel: number;
  comidas: number;
  pasajeOrigen: number;
  pasajeDestino: number;
  peajesViapass: number;
  seguroTraslado: number;
  sueldo: number;
  pagoEstadia: number;
  subTotal: number;
  admon: number;
  total: number;
  inflacion: number;
  financiamiento: number;
  ganancia: number;
  costo: number;
}

export interface FormatDataDetailQuote {
  id: string;
  folio: number;
  origen: string;
  destino: string;
  kms: string;
  rendimiento: string;
  litros: string;
  diesel: string;
  comidas: string;
  pasajeOrigen: string;
  pasajeDestino: string;
  peajesViapass: string;
  seguroTraslado: string;
  sueldo: string;
  pagoEstadia: string;
  subTotal: string;
  admon: string;
  total: string;
  inflacion: string;
  financiamiento: string;
  ganancia: string;
  costo: string;
}

export interface PayloadDetailQuote {
  data: DataDetailQuote[];
}

export interface ResponseDetailQuote {
  payload: PayloadDetailQuote;
  response: Response;
}

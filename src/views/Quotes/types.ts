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
  _id: string;
  origenId: number;
  destinoId: number;
  tipoUnidad: number;
  tipoTraslado: number;
  tipoViaje: number;
  estatus: string;
  folio: number;
  userId: string;
  fechaCreacion: string;
  __v: 0;
  origen: string;
  destino: string;
  kms: number;
  rend: number;
  lts: number;
  hoteles: number;
  totalLitros: number;
  precioDiesel: number;
  costoComidas: number;
  costoPasajes: number;
  costoPeajes: number;
  costoSueldo: number;
  subtotal: number;
  gastosAdministrativos: number;
  total: number;
  costoInflacion: number;
  financiamiento: number;
  ganancia: number;
  costoTotal: number;
}

export interface PayloadDetailQuote {
  data: DataDetailQuote[];
}

export interface ResponseDetailQuote {
  payload: PayloadDetailQuote;
  response: Response;
}

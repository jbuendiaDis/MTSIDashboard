import { Response } from '../../models';

interface DataQuotez {
  clientName: string;
  destinoId: number;
  estatus: string;
  createdAt: string;
  folio: number;
  origenId: number;
  tipoTraslado: number;
  tipoUnidad: number;
  tipoViajeId: number;
  userId: string;
  userName: string;
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
  // rendimiento: string | number | undefined;
  combustible: string | number | undefined;
  inflacion: string | number | undefined;
  financiamiento: string | number | undefined;
  // otros: string | number | undefined;
  // sucontrato: string | number | undefined;
  _id?: string;
}

interface DataDetailQuote {
  id: string;
  folio: number;
  origen: string;
  destino: string;
  hotel: number;
  kms: number;
  rendimiento: number;
  litros: number;
  diesel: number;
  comidas: number;
  pasajeLocalOrigen: number;
  pasajeLocalDestino: number;
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
  extra: number;
  dieselExtra: number;
  ferry: number;
  vuelo: number;
  talachas: number;
  liberacionPuerto: number;
  taxi: number;
  urea: number;
  udsUsa: number;
  fitosanitarias: number;
  otros?: number;
  dimensiones: string;
  trasladoTipo: string;
}

export interface FormatDataDetailQuote {
  id: string;
  origen: string;
  destino: string;
  hotel: string;
  kms: string;
  rendimiento: string;
  litros: string;
  diesel: string;
  comidas: string;
  pasajeLocalOrigen: string;
  pasajeLocalDestino: string;
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
  extra: string;
  dieselExtra: string;
  ferry: string;
  vuelo: string;
  talachas: string;
  liberacionPuerto: string;
  taxi: string;
  urea: string;
  udsUsa: string;
  fitosanitarias: string;
  otros: string;
  dimensiones: string;
  trasladoTipo: string;
  manual?: string;
  clienteNombre?: string;
}

export interface PayloadDetailQuote {
  data: DataDetailQuote[];
}

export interface ResponseDetailQuote {
  payload: PayloadDetailQuote;
  response: Response;
}

export interface ResponseSendEmail {
  payload: any;
  response: Response;
}

export interface ResponseViewQuoteDetail {
  payload: any;
  response: Response;
}

export interface PayloadViewQuoteDetail {
  data: ViewQuoteDetailData;
}

export interface ViewQuoteDetailData {
  _id: string;
  folio: number;
  estatus: string;
  userId: string;
  clienteId: string;
  clienteName: string;
  tipoViajeId: string;
  tipoViajeName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  detalles: QuoteDetailData[];
  socialReasonOrigin?: string;
  socialReasonDestinity?: string;
  notes?: string;
}

export interface QuoteDetailData {
  _id: string;
  valuesMoney: string;
  socialReasonOrigin: string;
  socialReasonDestinity: string;
  notes: string;
  solicitudId: string;
  folio: number;
  localidadOrigenId: string;
  localidadOrigenName: string;
  localidadDestinoId: string;
  localidadDestinoName: string;
  unidadId: string;
  unidadMarca: string;
  unidadModelo: string;
  trasladoId: string;
  trasladoTipo: string;
  trasladoConcepto: string;
  tipoViajeId: string;
  tipoViajeName: string;
  calle: string;
  numeroInterior: string;
  numeroExterior: string;
  colonia: string;
  cp: string;
  tipoSeguro: string;
  compania: string;
  numeroPoliza: string;
  modelo: string;
  peso: string;
  fotoUnidad: string;
  urlMapa: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  ultimoHistorial: {
    _id: string;
    quoteId: string;
    folio: number;
    clienteNombre: string;
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
    hotel: number;
    vuelo: number;
    taxi: number;
    ferry: number;
    udsUsa: number;
    liberacionPuerto: number;
    talachas: number;
    fitosanitarias: number;
    urea: number;
    extra: number;
    subTotal: number;
    admon: number;
    total: number;
    inflacion: number;
    financiamiento: number;
    ganancia: number;
    costo: number;
    fechaCreacion: string;
    __v: number;
  };
}

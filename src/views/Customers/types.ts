import { FormatDataState } from '../../models';
import { Response } from '../../models/responseApi';

export interface DataCustomer {
  state?: null | FormatDataState;
  calle: string;
  codigoCliente?: string;
  colonia: string;
  formaPago: string;
  metodoPago: string;
  numeroExterior: string;
  numeroInterior: string;
  razonSocial: string;
  regimenFiscal: string | any;
  rfc: string;
  telefono: string | number;
  usoCFDI: string | any;
  _id: string;
  estadoId?: number;
  // __v?: number | undefined | string;
}

export interface PaylaodCustomers {
  data: DataCustomer;
}

export interface Payload {
  payload: PaylaodCustomers;
  response: Response;
}

export interface CatalogItem {
  codigo: string;
  descripcion: string;
  fechaCreacion: string;
  idPadre: string;
  __v: number;
  _id: string;
}
export interface DataCatalogs {
  data: CatalogItem[];
}

export interface PayloadCatalogs {
  payload: DataCatalogs;
  response: Response;
}

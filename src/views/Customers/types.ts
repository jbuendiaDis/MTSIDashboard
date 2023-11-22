import { Response } from '../../models/responseApi';

interface DataCustomer {
  calle: string;
  codigoCliente: string;
  colonia: string;
  formaPago: string;
  metodoPago: string;
  numeroExterior: string;
  numeroInterior: string;
  razonSocial: string;
  regimenFiscal: string;
  rfc: string;
  telefono: string | number;
  usoCFDI: string;
  _id: string;
  // __v?: number | undefined | string;
}

export interface PaylaodCustomers {
  data: DataCustomer;
}

export interface Payload {
  payload: PaylaodCustomers;
  response: Response;
}

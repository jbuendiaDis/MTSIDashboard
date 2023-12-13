import { Response } from '../../models';

export interface dataUserClient {
  data: {
    direccion: string;
    email: string;
    genero: string;
    idCliente: string;
    nombre: string;
    nombreCliente: string;
    notas: string;
    password: string;
    puesto: string;
    telMovil: string;
    telOficina: string;
    whatsapp: string;
    __v?: number;
    _id?: string;
  }[];
}

export interface ResponseUserClient {
  payload: dataUserClient;
  response: Response;
}

export interface Options {
  label: string;
  value: string;
}

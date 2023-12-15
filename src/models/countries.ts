import { Response } from './responseApi';

export interface ResponseCountries {
  response: Response;
  payload: PayloadCountries;
}

export interface PayloadCountries {
  data: CountriesData[];
}

export interface CountriesData {
  codigo: number;
  coordenadas: [number, number] | any;
  costo?: string | number;
  estado: number;
  fechaCreacion: string | Date;
  fechaActualizacion: string | Date;
  nombre: string;
  __v: number;
  _id: string;
}

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
  coordenadas: [
    {
      0: number;
      1: number;
    }
  ];
  costo?: string | number;
  estado: number;
  fechaCreacion: string | Date;
  nombre: string;
  __v: number;
  _id: string;
}

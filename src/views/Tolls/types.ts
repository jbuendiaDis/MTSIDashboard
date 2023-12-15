import { CountriesData, Response } from '../../models';

interface State {
  codigo: number;
  label: string;
  _id: string;
}
export interface FormValues {
  unitType: string;
  state: State | undefined;
  nombre: CountriesData | undefined;
  costo: string | number;
}

export interface DataToll {
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
export interface PayloadTolls {
  data: DataToll[];
}
export interface ResponseTolls {
  response: Response;
  payload: PayloadTolls;
}

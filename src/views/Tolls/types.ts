import { CountriesData, Response } from '../../models';

interface State {
  codigo: number;
  label: string;
  _id: string;
}
export interface FormValues {
  unitType: string;
  state: State | null;
  nombre: CountriesData | null;
  costo: string | number;
  codigo?: number;
  _id?: string;
}

export interface DataToll {
  codigo: number;
  coordenadas?: [number, number];
  costo?: string | number;
  estado: number;
  fechaCreacion: string | Date;
  nombre: string;
  tipoUnidad: string;
  __v: number;
  _id: string;
}
export interface PayloadTolls {
  data: DataToll[] | DataToll;
}
export interface ResponseTolls {
  response: Response;
  payload: PayloadTolls;
}

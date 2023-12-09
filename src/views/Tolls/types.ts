import { Response } from '../../models';

interface State {
  codigo: number;
  label: string;
  _id: string;
}
export interface FormValues {
  nombre: string;
  costo: string | null;
  state: State | undefined;
  codigo: string | undefined;
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

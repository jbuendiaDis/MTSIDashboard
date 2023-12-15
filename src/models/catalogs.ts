import { Response } from './responseApi';

export interface DataCatalogs {
  descripcion: string;
  fechaCreacion: string;
  idPadre: null | string;
  __v: number;
  _id: string;
}

export interface PayloadCatalogs {
  data: DataCatalogs[];
}

export interface ResponseCatalogs {
  payload: PayloadCatalogs;
  response: Response;
}

export interface PayloadCatalogsUnitTypes {
  data: DataCatalogs[];
}

export interface ResponseCatalogsUnitTypes {
  payload: PayloadCatalogsUnitTypes;
  response: Response;
}

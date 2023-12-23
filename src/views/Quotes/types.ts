import { Response } from '../../models';

interface DataQuotez {
  destinoId: number;
  origenId: number;
  tipoTraslado: number;
  tipoUnidad: number;
  tipoViaje: number;
  _id: string;
}

export interface PayloadQuotez {
  data: DataQuotez[];
}

export interface ResponseQuotes {
  payload: PayloadQuotez;
  response: Response;
}

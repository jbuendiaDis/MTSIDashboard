import { Response } from '../../models';

export interface ResponseNotifications {
  payload: PayloadNotificaciones;
  response: Response;
}

export interface PayloadNotificaciones {
  data: NotificationsData[];
}

export interface NotificationsData {
  _id: string;
  folio: number;
  estatus: string;
  userId: string;
  clienteId: string;
  clienteName: string;
  tipoViajeId: string;
  tipoViajeName: string;
  createdAt: string;
  updatedAt: string;
  isUnRead?: boolean;
  __v: 0;
}

export interface RenderNotificationItem {
  key: any;
  notification: NotificationsData;
}

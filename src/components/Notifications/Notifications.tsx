import {
  IconButton,
  Badge,
  Popover,
  Box,
  Typography,
  // Tooltip,
  Divider,
  List,
  ListSubheader,
  ListItemButton,
  Grid,
  Tooltip,
} from '@mui/material';
import {
  InsertPhotoOutlined,
  LocationOnOutlined,
  // InsertPhotoOutlined,
  // LocationOnOutlined,
  NotificationsOutlined,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import {
  PayloadNotificaciones,
  RenderNotificationItem,
  ResponseNotifications,
} from './types';
import { ModalContextType, Response } from '../../models';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import MemoizedScrollbar from '../ScrollBar/ScrollBar';
import { Stack } from '@mui/system';
import { useModal } from '../Modal';
import { HeaderTitleModal } from '../Modal/HeaderTitleModal';
import {
  PayloadViewQuoteDetail,
  QuoteDetailData,
  ResponseViewQuoteDetail,
} from '../../views/Quotes/types';
import { format } from 'date-fns';
import CustomTable from '../Table/TableRender';

const Notifications = () => {
  const { handleOpenModal, handleCloseModal }: ModalContextType = useModal();
  const { modalInformation } = useModalConfirmation();
  const [open, setOpen] = useState<null>(null);
  const [notificationsData, setNotificationsData] = useState<any[]>([]);
  const totalUnRead = notificationsData.filter(
    (item: any) => item.isUnRead === true
  ).length;

  const _getViewQuote = useApi({
    endpoint: 'v2/solicitud/detallecompleto',
    method: 'get',
  });

  useEffect(() => {
    handleGetNotifications();
    const interval = setInterval(() => {
      handleGetNotifications();
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  const _getNotifications = useApi({
    endpoint: 'v2/solicitud/allbystatus/Pendiente',
    method: 'get',
  });

  const handleGetNotifications = async (): Promise<boolean> => {
    try {
      const { payload, response }: ResponseNotifications =
        await _getNotifications();
      const code: Response['code'] = response.code;
      const message: Response['message'] = response.message;
      const dataResponse: PayloadNotificaciones['data'] = payload.data;

      if (code === 200) {
        setNotificationsData(
          dataResponse.map((item) => ({
            ...item,
            isUnRead: true,
          }))
        );
      } else modalInformation({ message });
      return true;
    } catch (error) {
      return false;
    }
  };

  //   const totalUnRead = notifications.filter(
  //     (item) => item.isUnRead === true
  //   ).length;

  // const totalUnRead: number = 1;

  // const handleMarkAllAsRead = () => {
  //   setNotificationsData(
  //     notificationsData.map((notification) => ({
  //       ...notification,
  //       isUnRead: false,
  //     }))
  //   );
  // };

  const NotificationItem = ({ key, notification }: RenderNotificationItem) => {
    return (
      <ListItemButton
        key={key}
        sx={{
          py: 1.5,
          px: 2.5,
          mt: '1px',
          ...(notification.isUnRead && {
            bgcolor: 'action.selected',
          }),
        }}
        onClick={() => handleGetViewQuote(notification.folio)}
      >
        <Grid direction="column">
          <Stack direction="row" spacing={1}>
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              Cliente:
            </Typography>
            <Typography sx={{ fontSize: '11px' }}>
              {notification.clienteName}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
              Estatus:
            </Typography>
            <Typography sx={{ fontSize: '12px' }}>
              {notification.estatus}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
              Creado:
            </Typography>
            <Typography sx={{ fontSize: '12px' }}>
              {format(new Date(notification.createdAt), 'dd/MM/yyyy HH:mm')}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
              Folio:
            </Typography>
            <Typography sx={{ fontSize: '12px' }}>
              {notification.folio}
            </Typography>
          </Stack>
        </Grid>
      </ListItemButton>
    );
  };

  const columnsViewDetailQuote = [
    {
      name: 'Localidad origen',
      selector: (row: QuoteDetailData) => row.localidadOrigenName,
    },
    {
      name: 'Localidad destino',
      selector: (row: QuoteDetailData) => row.localidadDestinoName,
    },
    {
      name: 'Tipo viaje',
      selector: (row: QuoteDetailData) => row.tipoViajeName,
    },
    {
      name: 'Tipo traslado',
      selector: (row: QuoteDetailData) => row.trasladoTipo,
    },
    {
      name: 'Concepto traslado',
      selector: (row: QuoteDetailData) => row.trasladoConcepto,
    },
    {
      name: 'Unidad marca',
      selector: (row: QuoteDetailData) => row.unidadMarca,
    },
    {
      name: 'Unidad modelo',
      selector: (row: QuoteDetailData) => row.unidadModelo,
    },
    {
      name: 'Unidad año',
      selector: (row: QuoteDetailData) => row.modelo,
    },
    {
      name: 'Peso',
      selector: (row: QuoteDetailData) =>
        `${row.peso === '' ? 0 : row.peso} kg`,
    },
    {
      name: 'Acciones',
      cell: (row: QuoteDetailData) => (
        <Stack spacing={1} direction="row">
          <Tooltip title="Descargar Foto">
            <IconButton onClick={() => downloadImage(row.fotoUnidad)}>
              <InsertPhotoOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="Ruta Mapa">
            <IconButton onClick={() => window.open(row.urlMapa, '_blank')}>
              <LocationOnOutlined />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
      grow: 1,
      wrap: true,
    },
  ];

  const downloadImage = (base64Image: string) => {
    const getImageType = (base64Image: string): string => {
      const parts = base64Image.split(';base64,');
      if (parts.length === 2) {
        const mimeType = parts[0].split(':')[1];
        return mimeType.split('/')[1];
      }
      return 'jpg';
    };

    const byteString = atob(base64Image.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const imageType = getImageType(base64Image);
    const blob = new Blob([ab], { type: `image/${imageType}` });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `imagen.${imageType}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGetViewQuote = async (folio: number): Promise<boolean> => {
    try {
      const { payload, response }: ResponseViewQuoteDetail =
        await _getViewQuote({
          urlParam: folio,
        });
      const code: Response['code'] = response.code;
      const message: Response['message'] = response.message;
      const dataResponse: PayloadViewQuoteDetail['data'] = payload.data[0];

      if (code === 200) {
        setOpen(null);
        const createDateString = dataResponse.createdAt;
        const createDateFormat = new Date(createDateString);
        const updateDateString = dataResponse.updatedAt;
        const updateDateFormat = new Date(updateDateString);

        handleOpenModal({
          fullWidth: true,
          maxWidth: 'xl',
          title: (
            <HeaderTitleModal
              handleToggleModal={handleCloseModal}
              title={'DETALLES COTIZACIÓN'}
            />
          ),
          body: (
            <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={1}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                    Cliente:
                  </Typography>
                  <Typography sx={{ fontSize: '14px' }}>
                    {dataResponse.clienteName}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack direction="row" spacing={1}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                    Tipo de viaje:
                  </Typography>
                  <Typography sx={{ fontSize: '14px' }}>
                    {dataResponse.tipoViajeName}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack direction="row" spacing={1}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                    Estatus:
                  </Typography>
                  <Typography sx={{ fontSize: '14px' }}>
                    {dataResponse.estatus}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack direction="row" spacing={1}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                    Creado:
                  </Typography>
                  <Typography sx={{ fontSize: '14px' }}>
                    {format(createDateFormat, 'dd/MM/yyyy HH:mm')}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack direction="row" spacing={1}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                    Actualizado:
                  </Typography>
                  <Typography sx={{ fontSize: '14px' }}>
                    {format(updateDateFormat, 'dd/MM/yyyy HH:mm')}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <CustomTable
                  columns={columnsViewDetailQuote}
                  data={dataResponse.detalles}
                />
              </Grid>
            </Grid>
          ),
        });
      } else modalInformation({ message });
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div>
      <IconButton
        color={open ? 'primary' : 'inherit'}
        onClick={(event: any) => setOpen(event.currentTarget)}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <NotificationsOutlined />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={() => setOpen(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notificaciones</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {totalUnRead === 1
                ? `Tienes ${totalUnRead} notificacion`
                : `Tienes ${totalUnRead} notificaciones`}
            </Typography>
          </Box>

          {/* {totalUnRead > 0 && (
            <Tooltip title="Marcar todo como leído">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <DoneAll />
              </IconButton>
            </Tooltip>
          )} */}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MemoizedScrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: 'overline' }}
              >
                Cotizaciónes
              </ListSubheader>
            }
          >
            {notificationsData.map((item, index) => (
              <NotificationItem key={index} notification={item} />
            ))}
          </List>
          {/* <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: 'overline' }}
              >
                Before that
              </ListSubheader>
            }
          >
            {notifications.slice(2, 5).map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </List> */}
        </MemoizedScrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box> */}
      </Popover>
    </div>
  );
};

export { Notifications };

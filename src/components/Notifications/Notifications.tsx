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
} from '@mui/material';
import { NotificationsOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import {
  PayloadNotificaciones,
  RenderNotificationItem,
  ResponseNotifications,
} from './types';
import { Response } from '../../models';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import MemoizedScrollbar from '../ScrollBar/ScrollBar';
import { Stack } from '@mui/system';

const Notifications = () => {
  const { modalInformation } = useModalConfirmation();
  const [open, setOpen] = useState<null>(null);
  const [notificationsData, setNotificationsData] = useState<any[]>([]);
  const totalUnRead = notificationsData.filter(
    (item: any) => item.isUnRead === true
  ).length;

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
          {/* <Stack direction="row" spacing={1}>
            <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
              Tipo de Viaje:
            </Typography>
            <Typography sx={{ fontSize: '12px' }}>
              {notification.tipoViajeName}
            </Typography>
          </Stack> */}
        </Grid>
      </ListItemButton>
    );
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

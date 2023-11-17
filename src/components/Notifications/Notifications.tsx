import {
  IconButton,
  Badge,
  Popover,
  Box,
  Typography,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Notifications as MuiNotificationsIcon,
  DoneAll,
} from '@mui/icons-material';
import { useState } from 'react';

const Notifications = () => {
  const [open, setOpen] = useState<null>(null);

  //   const totalUnRead = notifications.filter(
  //     (item) => item.isUnRead === true
  //   ).length;

  const totalUnRead: number = 1;

  //   const handleMarkAllAsRead = () => {
  //     setNotifications(
  //       notifications.map((notification) => ({
  //         ...notification,
  //         isUnRead: false,
  //       }))
  //     );
  //   };

  return (
    <>
      <IconButton
        color={open ? 'primary' : 'default'}
        onClick={(event: any) => setOpen(event.currentTarget)}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <MuiNotificationsIcon />
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
              Tienes {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton
                color="primary"
                //    onClick={handleMarkAllAsRead}
              >
                <DoneAll />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {notifications.slice(0, 2).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Before that
              </ListSubheader>
            }
          >
            {notifications.slice(2, 5).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box> */}
      </Popover>
    </>
  );
};

export { Notifications };

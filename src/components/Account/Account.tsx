import { useState } from 'react';
import {
  Box,
  IconButton,
  Divider,
  Avatar,
  Popover,
  Typography,
  MenuItem,
} from '@mui/material';
import { useAuth } from '../Auth';
import { AccountStyles } from './AccountStyles';

const Account = () => {
  const [open, setOpen] = useState<null>(null);
  const style = AccountStyles({ open });
  const { user, logout } = useAuth();

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton onClick={handleOpen} sx={style.iconButton}>
        <Avatar sx={style.avatar}>{user?.name.charAt(0).toUpperCase()}</Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {`${user?.name} ${user?.lastname}`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={() => logout()}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Cerrar sesión
        </MenuItem>
      </Popover>
    </>
  );
};

export { Account };

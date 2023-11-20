import {
  Drawer as MuiDrawer,
  Theme,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { DrawerProps } from '../../models/drawer';
import { DrawerStyles } from './DrawerStyles';

const Drawer = ({
  open,
  title,
  children,
  anchor = 'right',
  onClose,
}: DrawerProps) => {
  const style = DrawerStyles;

  return (
    <MuiDrawer
      anchor={anchor}
      open={open}
      sx={{
        zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
        maxWidth: '100%',
      }}
    >
      <Box sx={{ width: { xs: 320, sm: 540 }, p: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'end', mb: 1 }}>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Typography sx={style.titleDrawer}>{title}</Typography>
        {children}
      </Box>
    </MuiDrawer>
  );
};

export { Drawer };

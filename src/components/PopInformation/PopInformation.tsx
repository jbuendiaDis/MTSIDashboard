import { Grid, Popover, Typography } from '@mui/material';
import { useState } from 'react';
import { PopInformationStyles } from './PopInformationStyles';
import { InfoOutlined } from '@mui/icons-material';

interface PopInformationProps {
  text: string;
}

const PopInformation = ({ text }: PopInformationProps) => {
  const style = PopInformationStyles;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid
        component="div"
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={style.contentInfoText}
      >
        <Typography sx={style.infoText}>{text}</Typography>
        <InfoOutlined sx={{ fontSize: '14px', ml: 0.5 }} />
      </Grid>

      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <Grid component="div" sx={{ padding: 2 }}>
          <Typography sx={{ fontSize: '12px' }}>
            La contraseña debe tener:
          </Typography>
          <Grid component="ul">
            <Grid component="li" sx={{ fontSize: '12px' }}>
              mínimo 8 caracteres.
            </Grid>
            <Grid component="li" sx={{ fontSize: '12px' }}>
              máximo 15 caracteres.
            </Grid>
            <Grid component="li" sx={{ fontSize: '12px' }}>
              1a. letra mayuscula.
            </Grid>
            <Grid component="li" sx={{ fontSize: '12px' }}>
              1 caracter especial.
            </Grid>
          </Grid>
        </Grid>
      </Popover>
    </>
  );
};

export { PopInformation };

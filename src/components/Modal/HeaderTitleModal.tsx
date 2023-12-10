import { Close } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';

interface HeaderTitleModalPRops {
  title: string;
  handleToggleModal: () => void;
}

const HeaderTitleModal = ({
  title,
  handleToggleModal,
}: HeaderTitleModalPRops) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Tooltip title="Cerrar">
          <IconButton onClick={handleToggleModal}>
            <Close />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography
        sx={{
          textAlign: 'center',
          fontWeight: 700,
          letterSpacing: '1.2px',
          fontSize: '20px',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export { HeaderTitleModal };

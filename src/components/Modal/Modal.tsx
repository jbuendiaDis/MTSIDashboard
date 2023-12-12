import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useModal } from './hooks/useModal';
import { ModalContextType } from '../../models';

const Modal = () => {
  const { modalState, handleCloseModal }: ModalContextType = useModal();
  const {
    fullWidth,
    show,
    title,
    body,
    actionButtons,
    maxWidth = 'xs',
    iconClose,
  } = modalState;

  return (
    <Dialog
      fullWidth={fullWidth}
      open={show}
      // onClose={() => {}}
      maxWidth={maxWidth}
      sx={{
        zIndex: (theme) => `${theme.zIndex.drawer + 2} !important`,
      }}
    >
      <DialogTitle>
        {iconClose && (
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <IconButton onClick={() => handleCloseModal()}>
              <Close />
            </IconButton>
          </Box>
        )}
        {title && title}
      </DialogTitle>
      <DialogContent>{body}</DialogContent>
      {actionButtons && (
        <DialogActions sx={{ pb: 2 }}>{actionButtons}</DialogActions>
      )}
    </Dialog>
  );
};

export { Modal };

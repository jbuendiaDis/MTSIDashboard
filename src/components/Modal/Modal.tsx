import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useModal } from './hooks/useModal';

const Modal = () => {
  const { modalState, handleCloseModal } = useModal();
  const {
    fullWidth,
    show,
    title,
    body,
    actionButtons,
    maxWidth = 'xs',
  } = modalState;

  return (
    <Dialog
      fullWidth={fullWidth}
      aria-labelledby="app-modal"
      open={show}
      onClose={handleCloseModal}
      maxWidth={maxWidth}
      sx={{
        zIndex: (theme) => `${theme.zIndex.drawer + 2} !important`,
      }}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{body}</DialogContent>
      {actionButtons && (
        <DialogActions sx={{ pb: 2 }}>{actionButtons}</DialogActions>
      )}
    </Dialog>
  );
};

export { Modal };

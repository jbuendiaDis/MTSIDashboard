import { Button, Grid, Stack, Typography } from '@mui/material';
import { useModal } from '../components/Modal';
import { ModalContextType } from '../models';

interface ModalSuccessProps {
  message?: string;
  callbackConfirm?: () => void;
  dataValue?: string;
}

export const useModalConfirmation = () => {
  const { handleOpenModal, handleCloseModal }: ModalContextType = useModal();
  const alertIcon = '/assets/alert-red.svg';
  const infoIcon = '/assets/alert.svg';
  const successIcon = '/assets/check_green.svg';

  const modalSuccess = ({ message, callbackConfirm }: ModalSuccessProps) => {
    handleOpenModal({
      fullWidth: true,
      maxWidth: 'xs',
      title: (
        <Grid sx={{ textAlign: 'center' }}>
          <Grid
            component="img"
            src={successIcon}
            alt="success"
            sx={{ width: 48, height: 48 }}
          />
          <Typography
            color="green"
            sx={{ fontSize: '20px', fontWeight: 700, letterSpacing: '1.2px' }}
          >
            Operacion realizada con exito
          </Typography>
        </Grid>
      ),
      body: (
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <Typography sx={{ mb: 2 }}>{message}</Typography>
          <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                handleCloseModal();
                if (callbackConfirm) {
                  callbackConfirm();
                }
              }}
            >
              Aceptar
            </Button>
          </Grid>
        </Grid>
      ),
    });
  };

  const modalInformation = ({
    message,
    callbackConfirm,
  }: ModalSuccessProps) => {
    handleOpenModal({
      fullWidth: true,
      maxWidth: 'xs',
      title: (
        <Grid sx={{ textAlign: 'center' }}>
          <Grid
            component="img"
            src={infoIcon}
            alt="warning"
            sx={{ width: 48, height: 48 }}
          />
          <Typography
            color="primary"
            sx={{ fontSize: '20px', fontWeight: 700, letterSpacing: '1.2px' }}
          >
            Oops!
          </Typography>
        </Grid>
      ),
      body: (
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <Typography sx={{ mb: 2 }}>{message}</Typography>
          <Grid sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                handleCloseModal();
                if (callbackConfirm) {
                  callbackConfirm();
                }
              }}
            >
              Aceptar
            </Button>
          </Grid>
        </Grid>
      ),
    });
  };

  const modalDelete = ({
    message,
    dataValue,
    callbackConfirm,
  }: ModalSuccessProps) => {
    handleOpenModal({
      fullWidth: true,
      maxWidth: 'xs',
      title: (
        <Grid sx={{ textAlign: 'center' }}>
          <Grid
            component="img"
            src={alertIcon}
            alt="warning"
            sx={{ width: 48, height: 48 }}
          />
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 700,
              letterSpacing: '1.2px',
            }}
          >
            Eliminar Información
          </Typography>
        </Grid>
      ),
      body: (
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{ mb: 2, textAlign: 'center' }}
          >{`${message} ${dataValue}?`}</Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => handleCloseModal()}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                handleCloseModal();
                if (callbackConfirm) {
                  callbackConfirm();
                }
              }}
            >
              Eliminar
            </Button>
          </Stack>
        </Grid>
      ),
    });
  };

  return {
    modalSuccess,
    modalInformation,
    modalDelete,
  };
};

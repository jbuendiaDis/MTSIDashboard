import { Button, Stack } from '@mui/material';
import { useLoader } from '../../components/Loader';
import { useModal } from '../../components/Modal';

const Home = () => {
  const { handleOpenModal, handleCloseModal } = useModal();
  const { handleShowLoader } = useLoader();

  const handleLoader = (): void => {
    handleShowLoader(true);

    setTimeout(() => {
      handleShowLoader(false);
    }, 1000);
  };

  return (
    <div style={{ marginTop: 100 }}>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => handleLoader()}>
          Loader
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            handleOpenModal({
              title: 'Titutlo Modal',
              body: 'Cuerpo del Modal',
              actionButtons: (
                <Button variant="contained" onClick={() => handleCloseModal()}>
                  Aceptar
                </Button>
              ),
            })
          }
        >
          Modal
        </Button>
      </Stack>
    </div>
  );
};

export { Home };

import { Button, Stack } from '@mui/material';
import { useLoader } from '../../components/Loader';
import { useModal } from '../../components/Modal';

import { Table } from '../../components/Table';
import { Delete, Edit } from '@mui/icons-material';

const Home = () => {
  const { handleOpenModal, handleCloseModal } = useModal();
  const { handleShowLoader } = useLoader();

  const handleLoader = (): void => {
    handleShowLoader(true);

    setTimeout(() => {
      handleShowLoader(false);
    }, 1000);
  };

  const columns: any[] = [
    { id: 'name', label: 'Nombre', align: 'left' },
    { id: 'lastName', label: 'Apellido', align: 'left' },
    { id: 'phone', label: 'Teléfono', align: 'left' },
    { id: 'email', label: 'Email', align: 'left' },
    {
      id: 'actions',
      label: 'Acciones',
      align: 'center',
      actions: [
        {
          label: 'Editar',
          icon: <Edit />,
          onClick: (rowData: any) => handleEditar(rowData),
        },
        {
          label: 'Eliminar',
          icon: <Delete />,
          onClick: (rowData: any) => handleEliminar(rowData),
        },
      ],
    },
  ];

  const handleEditar = (rowData: any) => {
    // Lógica para editar la fila seleccionada
    console.log('Editar:', rowData);
  };

  const handleEliminar = (rowData: any) => {
    // Lógica para eliminar la fila seleccionada
    console.log('Eliminar:', rowData);
  };

  const data = [
    {
      name: 'Carlos',
      lastName: 'Orta',
      phone: '1234567890',
      email: 'mail@dominio.com',
    },
    {
      name: 'Daniel',
      lastName: 'Ramírez',
      phone: '5511223344',
      email: 'mail@dominio.com',
    },
    {
      name: 'Juan',
      lastName: 'Angel',
      phone: '000000000',
      email: 'mail@dominio.com',
    },
    {
      name: 'Adrian',
      lastName: 'Martinez',
      phone: '11111111',
      email: 'mail@dominio.com',
    },
  ];
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
      <Table
        title="Table example"
        // textButton="Agregar"
        data={data}
        columns={columns}
        showCheckboxes={true}
        tableHead={true}
      />
    </div>
  );
};

export { Home };

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useLoader } from '../../components/Loader';
import { LoaderContextType, ModalContextType } from '../../models';
import { useHelpers } from './helpers';
import { Table } from '../../components/Table';
import { Column } from '../../models/table';
import { Add } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useModal } from '../../components/Modal';
import { Formik, Form } from 'formik';
import Input from '../../components/Input/Input';

const Bills = () => {
  const { handleOpenModal }: ModalContextType = useModal();
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { initialValues, billsDataTable, handleGetAllBills, handleSubmit } =
    useHelpers();

  useEffect(() => {
    handleShowLoader(true);
    handleGetAllBills();
  }, []);

  const columns: Column[] = [
    { id: 'origen', label: 'Origen', align: 'left' },
    { id: 'destino', label: 'Destino', align: 'left' },
    { id: 'comidas', label: 'Comidas', align: 'left' },
    { id: 'hoteles', label: 'Hoteles', align: 'left' },
    { id: 'pasajeOrigen', label: 'Pasaje Origen', align: 'left' },
    { id: 'pasajeDestino', label: 'Pasaje Destino', align: 'left' },
    { id: 'peajes', label: 'Peajes', align: 'left' },
    // {
    //   id: 'actions',
    //   label: 'Acciones',
    //   align: 'center',
    //   actions: [
    //     {
    //       label: 'Editar',
    //       icon: <ModeEditOutlineOutlined sx={{ width: 20, height: 20 }} />,
    //       onClick: (rowData: DataUsers) => handleUpdateUser(rowData),
    //     },
    //     {
    //       label: 'Eliminar',
    //       icon: (
    //         <DeleteOutlineOutlined
    //           sx={{ width: 20, height: 20, color: 'red' }}
    //         />
    //       ),
    //       onClick: (rowData: DataUsers) => handleOpenModalDelete(rowData),
    //     },
    //   ],
    // },
  ];

  const handleModal = () => {
    handleOpenModal({
      // fullWidth: true,
      // maxWidth: 'sm',
      title: 'Modal',
      body: (
        <Box sx={{ mt: 2 }}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Input label="example" name="canem" />
            </Form>
          </Formik>
        </Box>
      ),
    });
  };

  return (
    <div>
      <Table
        showCheckboxes={false}
        tableHead
        title="Gastos"
        data={billsDataTable}
        columns={columns}
        customButton
        renderCustomButton={
          <Button
            variant="contained"
            color="inherit"
            sx={{ p: '10px 20px', letterSpacing: '1px' }}
            onClick={() => handleModal()}
            startIcon={<Add />}
          >
            Agregar Gasto
          </Button>
        }
      />
    </div>
  );
};

export { Bills };

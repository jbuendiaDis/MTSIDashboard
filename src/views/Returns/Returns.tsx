/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Box, IconButton, Typography } from '@mui/material';
import {
  Add,
  Close,
  DeleteOutlineOutlined,
  ModeEditOutlineOutlined,
} from '@mui/icons-material';
import { Table } from '../../components/Table';
import { Column, Response } from '../../models';
import { useHelpers } from './helpers';
import { useModal } from '../../components/Modal';
import { useApi } from '../../hooks/useApi';
import { Form, Formik } from 'formik';
import { ReturnsForm } from './ReturnsForm';
import { useEffect } from 'react';
import { PayloadDataReturns, ResponseReturns } from './types';

const Returns = () => {
  const {
    initialValues,
    dataEdit,
    returnsData,
    validationSchema,
    handleOpenModalDelete,
    setDataEdit,
    handleSubmit,
  } = useHelpers();
  const { handleOpenModal, handleCloseModal } = useModal();

  const _getReturn = useApi({
    endpoint: '/rendimientos',
    method: 'get',
  });

  useEffect(() => {
    if (dataEdit !== null) handleFormModal();
  }, [dataEdit]);

  const handleToggleModal = (): void => {
    handleCloseModal();
    setDataEdit(null);
  };

  const columns: Column[] = [
    { id: 'marca', label: 'Marca', align: 'left' },
    { id: 'modelo', label: 'Modelo', align: 'left' },
    { id: 'rendimiento', label: 'Rendimiento', align: 'left' },
    {
      id: 'actions',
      label: 'Acciones',
      align: 'center',
      actions: [
        {
          label: 'Editar',
          icon: <ModeEditOutlineOutlined sx={{ width: 20, height: 20 }} />,
          onClick: (rowData: any) => handleGetReturn(rowData._id),
        },
        {
          label: 'Eliminar',
          icon: (
            <DeleteOutlineOutlined
              sx={{ width: 20, height: 20, color: 'red' }}
            />
          ),
          onClick: (rowData: any) => handleOpenModalDelete(rowData),
        },
      ],
    },
  ];

  const handleGetReturn = async (id: string): Promise<boolean> => {
    try {
      const { payload, response }: ResponseReturns = await _getReturn({
        urlParam: id,
      });
      const code: Response['code'] = response.code;
      const dataEditResponse: PayloadDataReturns['data'] = payload.data;

      if (code === 200) {
        setDataEdit(dataEditResponse);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleFormModal = () => {
    handleOpenModal({
      fullWidth: true,
      maxWidth: 'xs',
      title: (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <IconButton onClick={handleToggleModal}>
              <Close />
            </IconButton>
          </Box>
          <Typography
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              letterSpacing: '1.2px',
              fontSize: '20px',
            }}
          >
            {dataEdit ? 'EDITAR RENDIMIENTO' : 'CREAR RENDIMIENTO'}
          </Typography>
        </Box>
      ),
      body: (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <ReturnsForm toggleModal={handleToggleModal} dataEdit={dataEdit} />
          </Form>
        </Formik>
      ),
    });
  };

  return (
    <div>
      <Table
        data={returnsData}
        columns={columns}
        tableHead
        title="Rendimientos"
        customButton
        renderCustomButton={
          <Button
            variant="contained"
            color="inherit"
            sx={{ p: '10px 20px', letterSpacing: '1px' }}
            onClick={() => handleFormModal()}
            startIcon={<Add />}
          >
            Agregar Rendimiento
          </Button>
        }
        showCheckboxes={false}
      />
    </div>
  );
};

export { Returns };

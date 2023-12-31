/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useLoader } from '../../components/Loader';
import { LoaderContextType, ModalContextType } from '../../models';
import { useHelpers } from './helpers';
import { Table } from '../../components/Table';
import { Column } from '../../models';
import {
  Add,
  DeleteOutlineOutlined,
  ModeEditOutlineOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useModal } from '../../components/Modal';
import { Formik } from 'formik';
import { TollExpensesData } from './types';
import { DetailBills } from './DetailBills';
import { BillForm } from './BillForm';
import { HeaderTitleModal } from '../../components/Modal/HeaderTitleModal';
import { useRootProvider } from '../../components/RootProvider/hooks/useRootProvider';

const Bills = () => {
  const { handleOpenModal, handleCloseModal }: ModalContextType = useModal();
  const { handleShowLoader }: LoaderContextType = useLoader();
  const { actionsState, actionsCountries }: any = useRootProvider();
  const { states, handleGetStates } = actionsState;
  const { handleResetLocalidades, handleResetLocalidadesSecond } =
    actionsCountries;
  const {
    dataEdit,
    initialValues,
    billsDataTable,
    handleGetAllBills,
    handleGetBill,
    handleOpenDeleteModal,
    handleSubmit,
    setDataEdit,
    validationSchema,
  } = useHelpers();

  useEffect(() => {
    handleResetLocalidades();
    handleResetLocalidadesSecond();
    handleShowLoader(true);
    handleGetAllBills();
    handleGetStates();
  }, []);

  useEffect(() => {
    if (dataEdit) handleModal();
  }, [dataEdit]);

  const handleToggleModal = (): void => {
    handleCloseModal();
    setDataEdit(null);
  };

  const columns: Column[] = [
    { id: 'nombreOrigen', label: 'Origen', align: 'left' },
    { id: 'nombreDestino', label: 'Destino', align: 'left' },
    { id: 'pasajeOrigen', label: 'Pasaje Origen', align: 'left' },
    { id: 'pasajeDestino', label: 'Pasaje Destino', align: 'left' },
    { id: 'comidas', label: 'Comidas', align: 'left' },
    { id: 'hoteles', label: 'Hoteles', align: 'left' },
    { id: 'totalPeajes', label: 'Total Peajes', align: 'left' },
    { id: 'totalKilometers', label: 'Total Kms', align: 'left' },
    {
      id: 'actions',
      label: 'Acciones',
      align: 'center',
      actions: [
        // {
        //   label: 'Editar',
        //   icon: <ModeEditOutlineOutlined sx={{ width: 20, height: 20 }} />,
        //   onClick: (rowData: TollExpensesData['data']) =>
        //     handleGetBill(rowData._id),
        // },
        {
          label: 'Detalle',
          icon: <VisibilityOutlined sx={{ width: 20, height: 20 }} />,
          onClick: (rowData: TollExpensesData['data']) =>
            hanldeDetailBills(rowData),
        },
        {
          label: 'Eliminar',
          icon: (
            <DeleteOutlineOutlined
              sx={{ width: 20, height: 20, color: 'red' }}
            />
          ),
          onClick: (rowData: TollExpensesData['data']) =>
            handleOpenDeleteModal(rowData),
        },
      ],
    },
  ];

  const hanldeDetailBills = (data: TollExpensesData['data']) => {
    console.log('data', data);
    handleOpenModal({
      fullWidth: true,
      maxWidth: 'md',
      title: (
        <HeaderTitleModal
          handleToggleModal={() => handleCloseModal()}
          title="DETALLE DE GASTOS"
        />
      ),
      body: <DetailBills detailBillsData={data} />,
    });
  };

  const handleModal = () => {
    handleOpenModal({
      fullWidth: true,
      maxWidth: 'sm',
      title: (
        <HeaderTitleModal
          handleToggleModal={handleToggleModal}
          title={dataEdit ? 'EDITAR GASTO' : 'CREAR GASTO'}
        />
      ),
      body: (
        <Box sx={{ mt: 2 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <BillForm
              handleToggleModal={handleToggleModal}
              states={states}
              dataEdit={dataEdit}
            />
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

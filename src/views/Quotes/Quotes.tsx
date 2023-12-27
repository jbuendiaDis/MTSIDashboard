/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { Drawer } from '../../components/Drawer';
import { Table } from '../../components/Table';
import { Column, ModalContextType } from '../../models';
import { useHelpers } from './helpers';
import { Grid, TextField, InputAdornment, Stack, Button } from '@mui/material';
import { RequestQuoteOutlined } from '@mui/icons-material';
import { FormValues } from './types';
import { useModal } from '../../components/Modal';
import { HeaderTitleModal } from '../../components/Modal/HeaderTitleModal';

const Quotes = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { handleOpenModal, handleCloseModal }: ModalContextType = useModal();
  const { formikConfig, isQuotez, isConfigureData, dataQuotezTable } =
    useHelpers({ setOpen });

  const columns: Column[] = [
    { id: 'folio', label: 'Folio', align: 'left' },
    { id: 'clientName', label: 'Cliente', align: 'left' },
    { id: 'estatus', label: 'Estatus', align: 'left' },
    { id: 'fechaCreacion', label: 'Fecha Creación', align: 'left' },
    {
      id: 'actions',
      label: 'Acciones',
      align: 'center',
      actions: [
        {
          label: 'Generar',
          icon: <RequestQuoteOutlined sx={{ width: 20, height: 20 }} />,
          onClick: (rowData: any) => handleModal(),
        },
        // {
        //   label: 'Detalle',
        //   icon: <VisibilityOutlined sx={{ width: 20, height: 20 }} />,
        //   onClick: (rowData: TollExpensesData['data']) =>
        //     hanldeDetailBills(rowData),
        // },
        // {
        //   label: 'Eliminar',
        //   icon: (
        //     <DeleteOutlineOutlined
        //       sx={{ width: 20, height: 20, color: 'red' }}
        //     />
        //   ),
        //   onClick: (rowData: TollExpensesData['data']) =>
        //     handleOpenDeleteModal(rowData),
        // },
      ],
    },
  ];

  const handleModal = () => {
    handleOpenModal({
      fullWidth: true,
      maxWidth: 'sm',
      title: (
        <HeaderTitleModal
          handleToggleModal={() => handleCloseModal()}
          title="GENERAR COTIZACION"
        />
      ),
      body: (
        <Grid>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="end"
            sx={{ mt: 3 }}
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => handleCloseModal()}
            >
              Cancelar
            </Button>
            <Button variant="contained">Enviar</Button>
          </Stack>
        </Grid>
      ),
    });
  };

  const getHelperText = (fieldName: keyof FormValues) => {
    if (formikConfig.errors[fieldName]) {
      return String(formikConfig.errors[fieldName]);
    }
    return undefined;
  };

  const handleCloseDrawer = () => {
    formikConfig.resetForm();
    setOpen(false);
  };

  return (
    <div>
      <Table
        isQuotez={isQuotez}
        isConfigureData={isConfigureData}
        showCheckboxes={false}
        tableHead
        title="Cotizaciones"
        columns={columns}
        data={dataQuotezTable}
        handleQuotez={() => setOpen(!open)}
      />
      <Drawer
        open={open}
        anchor="right"
        title="Configurar Variables"
        onClose={handleCloseDrawer}
      >
        <form>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Rendimiento"
                id="rendimiento"
                name="rendimiento"
                type="number"
                value={formikConfig.values.rendimiento}
                onChange={formikConfig.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Lts</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Combustible"
                id="combustible"
                name="combustible"
                type="number"
                value={formikConfig.values.combustible}
                onChange={formikConfig.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                onBlur={formikConfig.handleBlur}
                error={
                  formikConfig.touched.combustible &&
                  Boolean(formikConfig.errors.combustible)
                }
                helperText={getHelperText('combustible')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Inflación"
                id="inflacion"
                name="inflacion"
                type="number"
                value={formikConfig.values.inflacion}
                onChange={formikConfig.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                onBlur={formikConfig.handleBlur}
                error={
                  formikConfig.touched.inflacion &&
                  Boolean(formikConfig.errors.inflacion)
                }
                helperText={getHelperText('inflacion')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Financiamiento"
                id="financiamiento"
                name="financiamiento"
                type="number"
                value={formikConfig.values.financiamiento}
                onChange={formikConfig.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                onBlur={formikConfig.handleBlur}
                error={
                  formikConfig.touched.financiamiento &&
                  Boolean(formikConfig.errors.financiamiento)
                }
                helperText={getHelperText('financiamiento')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Otros"
                id="otros"
                name="otros"
                type="number"
                value={formikConfig.values.otros}
                onChange={formikConfig.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Sucontrato"
                id="sucontrato"
                name="sucontrato"
                type="number"
                value={formikConfig.values.sucontrato}
                onChange={formikConfig.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="end"
            sx={{ mt: 8 }}
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleCloseDrawer}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={() => formikConfig.submitForm()}
            >
              Enviar
            </Button>
          </Stack>
        </form>
      </Drawer>
    </div>
  );
};

export { Quotes };

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Drawer } from '../../components/Drawer';
import { Table } from '../../components/Table';
import { Column } from '../../models';
import { useHelpers } from './helpers';
import { Grid, TextField, InputAdornment, Stack, Button } from '@mui/material';
import { RequestQuoteOutlined } from '@mui/icons-material';
import { FormValues } from './types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRootProvider } from '../../components/RootProvider/hooks/useRootProvider';

const Quotes = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [valueState, setValueState] = useState<any | null>(null);
  const {
    formikConfig,
    dataQuotezTable,
    configureData,
    handleGetConfigDataById,
    handleGetQuotezByClient,
  } = useHelpers({ setOpen });
  const { actionsCustomers }: any = useRootProvider();
  const { customers, handleGetCustomers } = actionsCustomers;

  useEffect(() => {
    handleGetCustomers();
    setValueState(null);
  }, [pathname]);

  const columns: Column[] = [
    { id: 'folio', label: 'Folio', align: 'left' },
    { id: 'clientName', label: 'Cliente', align: 'left' },
    { id: 'estatus', label: 'Estatus', align: 'left' },
    { id: 'createdAt', label: 'Fecha Creación', align: 'left' },
  ];

  if (pathname === '/quotes') {
    columns.push({
      id: 'actions',
      label: 'Acciones',
      align: 'center',
      actions: [
        {
          label: 'Generar',
          icon: <RequestQuoteOutlined sx={{ width: 20, height: 20 }} />,
          onClick: (rowData: any) =>
            handleNavigate(rowData.folio, rowData.clientName),
        },
      ],
    });
  }

  const handleNavigate = (folio: number, client: string) => {
    navigate(`/detail-quote/${folio}`, { state: { clientName: client } });
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

  useEffect(() => {
    if (valueState !== null) {
      handleGetQuotezByClient(valueState._id);
    }
  }, [valueState]);

  return (
    <div>
      <Table
        showCheckboxes={false}
        tableHead
        title={
          pathname === '/quotes' ? 'Cotizaciones' : 'Historial de Cotizaciones'
        }
        columns={columns}
        data={dataQuotezTable}
        handleQuotez={() =>
          configureData
            ? handleGetConfigDataById(configureData._id)
            : setOpen(!open)
        }
        setValueState={setValueState}
        valueState={valueState}
        optionsData={customers}
      />
      <Drawer
        open={open}
        anchor="right"
        title={configureData ? 'Editar Variables' : 'Configurar Variables'}
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
              {configureData ? 'Guardar' : 'Enviar'}
            </Button>
          </Stack>
        </form>
      </Drawer>
    </div>
  );
};

export { Quotes };

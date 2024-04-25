import { useEffect, useState } from 'react';
import { Drawer } from '../../components/Drawer';
import { Table } from '../../components/Table';
import { Column, ModalContextType, Response } from '../../models';
import { useHelpers } from './helpers';
import {
  Grid,
  TextField,
  InputAdornment,
  Stack,
  Button,
  Typography,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  RequestQuoteOutlined,
  VisibilityOutlined,
  InsertPhotoOutlined,
  LocationOnOutlined,
} from '@mui/icons-material';
import {
  FormValues,
  PayloadViewQuoteDetail,
  QuoteDetailData,
  ResponseViewQuoteDetail,
} from './types';
import { useLocation, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { useRootProvider } from '../../components/RootProvider/hooks/useRootProvider';
import { useApi } from '../../hooks/useApi';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import { useModal } from '../../components/Modal';
import { HeaderTitleModal } from '../../components/Modal/HeaderTitleModal';
import { format } from 'date-fns';
import CustomTable from '../../components/Table/TableRender';

const Quotes = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [valueState, setValueState] = useState<any | null>(null);
  const [newCustomersData, setNewCustomersData] = useState<any[]>([]);
  const {
    formikConfig,
    dataQuotezTable,
    configureData,
    setDataQuotezTable,
    handleGetConfigDataById,
    handleGetQuotezByClient,
    handleGetHistorialQuotezByClient,
  } = useHelpers({ setOpen });
  const { actionsCustomers }: any = useRootProvider();
  const { customers, handleGetCustomers } = actionsCustomers;
  const { modalInformation } = useModalConfirmation();
  const { handleOpenModal, handleCloseModal }: ModalContextType = useModal();

  const _getViewQuote = useApi({
    endpoint: 'v2/solicitud/detallecompleto',
    method: 'get',
  });

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
        {
          label: 'Ver',
          icon: <VisibilityOutlined sx={{ width: 20, height: 20 }} />,
          onClick: (rowData: any) => handleGetViewQuote(rowData.folio),
        },
      ],
    });
  }

  const downloadImage = (base64Image: string) => {
    const getImageType = (base64Image: string): string => {
      const parts = base64Image.split(';base64,');
      if (parts.length === 2) {
        const mimeType = parts[0].split(':')[1];
        return mimeType.split('/')[1];
      }
      return 'jpg';
    };

    const byteString = atob(base64Image.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const imageType = getImageType(base64Image);
    const blob = new Blob([ab], { type: `image/${imageType}` });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `imagen.${imageType}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columnsViewDetailQuote = [
    {
      name: 'No. Poliza',
      selector: (row: QuoteDetailData) => row.numeroPoliza,
    },
    {
      name: 'Compañia',
      selector: (row: QuoteDetailData) => row.compania,
    },
    {
      name: 'Valor poliza',
      selector: (row: QuoteDetailData) => row.valuesMoney,
    },
    {
      name: 'Localidad origen',
      selector: (row: QuoteDetailData) => row.localidadOrigenName,
    },
    {
      name: 'Localidad destino',
      selector: (row: QuoteDetailData) => row.localidadDestinoName,
    },
    {
      name: 'Razón social origen',
      selector: (row: QuoteDetailData) => row.socialReasonOrigin,
    },
    {
      name: 'Razón social destino',
      selector: (row: QuoteDetailData) => row.socialReasonDestinity,
    },
    {
      name: 'Localidad destino',
      selector: (row: QuoteDetailData) => row.localidadDestinoName,
    },
    {
      name: 'Tipo viaje',
      selector: (row: QuoteDetailData) => row.tipoViajeName,
    },
    {
      name: 'Tipo traslado',
      selector: (row: QuoteDetailData) => row.trasladoTipo,
    },
    {
      name: 'Concepto traslado',
      selector: (row: QuoteDetailData) => row.trasladoConcepto,
    },
    {
      name: 'Unidad marca',
      selector: (row: QuoteDetailData) => row.unidadMarca,
    },
    {
      name: 'Unidad modelo',
      selector: (row: QuoteDetailData) => row.unidadModelo,
    },
    {
      name: 'Unidad año',
      selector: (row: QuoteDetailData) => row.modelo,
    },
    {
      name: 'Peso',
      selector: (row: QuoteDetailData) =>
        `${row.peso === '' ? 0 : row.peso} kg`,
    },
    {
      name: 'Notas/Referencias',
      selector: (row: QuoteDetailData) => row.notes,
    },
    {
      name: 'Acciones',
      cell: (row: QuoteDetailData) => (
        <Stack spacing={1} direction="row">
          <Tooltip title="Descargar Foto">
            <IconButton onClick={() => downloadImage(row.fotoUnidad)}>
              <InsertPhotoOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="Ruta Mapa">
            <IconButton onClick={() => window.open(row.urlMapa, '_blank')}>
              <LocationOnOutlined />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
      grow: 1,
      wrap: true,
    },
  ];

  const handleGetViewQuote = async (folio: string): Promise<boolean> => {
    try {
      const { payload, response }: ResponseViewQuoteDetail =
        await _getViewQuote({
          urlParam: folio,
        });
      const code: Response['code'] = response.code;
      const message: Response['message'] = response.message;
      const dataResponse: PayloadViewQuoteDetail['data'] = payload.data[0];

      if (code === 200) {
        const createDateString = dataResponse.createdAt;
        const createDateFormat = new Date(createDateString);
        const updateDateString = dataResponse.updatedAt;
        const updateDateFormat = new Date(updateDateString);

        handleOpenModal({
          fullWidth: true,
          maxWidth: 'xl',
          title: (
            <HeaderTitleModal
              handleToggleModal={handleCloseModal}
              title={'DETALLES COTIZACIÓN'}
            />
          ),
          body: (
            <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={1}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                    Cliente:
                  </Typography>
                  <Typography sx={{ fontSize: '14px' }}>
                    {dataResponse.clienteName}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack direction="row" spacing={1}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                    Estatus:
                  </Typography>
                  <Typography sx={{ fontSize: '14px' }}>
                    {dataResponse.estatus}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack direction="row" spacing={1}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                    Creado:
                  </Typography>
                  <Typography sx={{ fontSize: '14px' }}>
                    {format(createDateFormat, 'dd/MM/yyyy HH:mm')}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={3}>
                <Stack direction="row" spacing={1}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                    Actualizado:
                  </Typography>
                  <Typography sx={{ fontSize: '14px' }}>
                    {format(updateDateFormat, 'dd/MM/yyyy HH:mm')}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <CustomTable
                  columns={columnsViewDetailQuote}
                  data={dataResponse.detalles}
                />
              </Grid>
            </Grid>
          ),
        });
      } else modalInformation({ message });
      return true;
    } catch (error) {
      return false;
    }
  };

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
      setDataQuotezTable([]);
      if (pathname === '/quotes') handleGetQuotezByClient(valueState._id);
      else handleGetHistorialQuotezByClient(valueState._id);
    }
  }, [valueState]);

  const handleExportDataQuoteHistorial = (): void => {
    const filteredData = dataQuotezTable.map((item) => ({
      Folio: item.folio,
      Estatus: item.estatus,
      'Fecha Creación': item.createdAt,
      'Nombre cliente': item.clientName,
      'Nombre usuario': item.userName,
    }));

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Cotizaciones');
    XLSX.writeFile(workbook, 'cotizaciones.xlsx');
  };

  useEffect(() => {
    if (pathname === '/quote-history') {
      const newValueCustomer = [
        {
          _id: '0',
          codigoCliente: '',
          razonSocial: 'TODOS LOS CLIENTES',
          rfc: '',
          metodoPago: '',
          formaPago: '',
          regimenFiscal: '',
          usoCFDI: '',
          telefono: '',
          calle: '',
          numeroExterior: '',
          numeroInterior: '',
          colonia: '',
          estado: '',
        },
      ];

      const newData: any[] = [...newValueCustomer, ...customers];
      setNewCustomersData(newData);
    }
  }, [pathname]);

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
        handleExportDataQuoteHistorial={handleExportDataQuoteHistorial}
        setValueState={setValueState}
        valueState={valueState}
        optionsData={
          pathname === '/quote-history' ? newCustomersData : customers
        }
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

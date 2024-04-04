import { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  DownloadOutlined,
  EditOutlined,
  Close,
  ExitToAppOutlined,
} from '@mui/icons-material';
import {
  FormatDataDetailQuote,
  PayloadDetailQuote,
  ResponseDetailQuote,
  ResponseSendEmail,
} from './types';
import { useApi } from '../../hooks/useApi';
import { ModalContextType, Response } from '../../models';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { formatToCurrency } from '../../utils/amountFormater';
import { useModal } from '../../components/Modal';
import { HeaderTitleModal } from '../../components/Modal/HeaderTitleModal';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { ArrowBack } from '@mui/icons-material';
import { useModalConfirmation } from '../../hooks/useModalConfirmation';
import { get } from 'lodash';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
import CustomTable from '../../components/Table/TableRender';
import * as XLSX from 'xlsx';

const DetailQuote = () => {
  const location = useLocation();
  const { state } = location;
  const { folio } = useParams();
  const { handleOpenModal, handleCloseModal }: ModalContextType = useModal();
  const { modalInformation, modalSuccess } = useModalConfirmation();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<FormatDataDetailQuote[]>([]);
  const [updateData, setUpdateData] = useState<any | null>(null);

  const [marca, setMarca] = useState<any[]>([]);
  const [modelo, setModelo] = useState<any[]>([]);
  const [selectedValueMarca, setSelectedValueMarca] = useState<any | null>(
    null
  );
  const [selectedValueModelo, setSelectedValueModelo] = useState<any | null>(
    null
  );
  const [other, setOther] = useState<number | string>('');
  const [subcontract, setSubcontract] = useState<number | string>('');
  const isFolio: string | undefined = folio ? folio : '';
  const navigation = useNavigate();

  const _getQuoteFolio = useApi({
    endpoint: '/v2/cotizacion',
    method: 'get',
  });

  const _cancelQuoteFolio = useApi({
    endpoint: '/quotes01/cancel',
    method: 'put',
  });

  const _sendQuote = useApi({
    endpoint: '/v1/solicitud/details/send',
    method: 'post',
  });

  const _updateDetailQuote = useApi({
    endpoint: 'v2/actualizarendimiento',
    method: 'put',
  });

  const _getRendimientoMarcas = useApi({
    endpoint: 'rendimiento/marcas',
    method: 'get',
  });

  const _getRendimientoModelos = useApi({
    endpoint: 'rendimiento/modelos',
    method: 'get',
  });

  useEffect(() => {
    if (isFolio !== '') handleGetQuoteFolio(isFolio);
  }, [isFolio]);

  useEffect(() => {
    if (selectedValueMarca !== null) {
      handleGetModelo(selectedValueMarca.label);
    }
  }, [selectedValueMarca]);

  useEffect(() => {
    if (selectedValueMarca !== null) setSelectedValueModelo(null);
  }, [selectedValueMarca]);

  const handleGetModelo = async (marca: any): Promise<boolean> => {
    try {
      const { payload, response }: any = await _getRendimientoModelos({
        urlParam: marca,
      });
      const code: Response['code'] = response.code;
      const message: Response['message'] = response.message;
      const dataResponse: any[] = payload.data;

      if (code === 200) {
        setModelo(dataResponse);
      } else {
        modalInformation({ message });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetQuoteFolio = async (valueFolio: string): Promise<boolean> => {
    try {
      const { payload, response }: ResponseDetailQuote = await _getQuoteFolio({
        urlParam: valueFolio,
      });
      const dataResponse: PayloadDetailQuote['data'] = payload.data;
      const code: Response['code'] = response.code;
      const message: Response['message'] = response.message;

      if (code === 200) {
        const formatData: FormatDataDetailQuote[] = dataResponse.map((item) => {
          return {
            ...item,
            comidas: formatToCurrency(item.comidas),
            costo: formatToCurrency(item.costo),
            diesel: formatToCurrency(item.diesel),
            financiamiento: formatToCurrency(item.financiamiento),
            ganancia: formatToCurrency(item.ganancia),
            inflacion: formatToCurrency(item.inflacion),
            kms: `${item.kms} kms`,
            litros: `${item.litros ? item.litros : '0'} Lts`,
            admon: formatToCurrency(item.admon),
            ferry: formatToCurrency(item.ferry),
            vuelo: formatToCurrency(item.vuelo),
            pagoEstadia: formatToCurrency(item.pagoEstadia),
            pasajeLocalDestino: formatToCurrency(
              item.pasajeLocalDestino ? item.pasajeLocalDestino : 0
            ),
            pasajeLocalOrigen: formatToCurrency(
              item.pasajeLocalOrigen ? item.pasajeLocalOrigen : 0
            ),
            pasajeDestino: formatToCurrency(item.pasajeDestino),
            pasajeOrigen: formatToCurrency(item.pasajeOrigen),
            peajesViapass: formatToCurrency(item.peajesViapass),
            hotel: formatToCurrency(item.hotel),
            rendimiento: `${item.rendimiento} kms/Lt`,
            seguroTraslado: formatToCurrency(item.seguroTraslado),
            subTotal: formatToCurrency(item.subTotal),
            sueldo: formatToCurrency(item.sueldo),
            extra: formatToCurrency(item.extra),
            total: formatToCurrency(item.total),
            talachas: formatToCurrency(item.talachas),
            liberacionPuerto: formatToCurrency(item.liberacionPuerto),
            taxi: formatToCurrency(item.taxi),
            urea: formatToCurrency(item.urea),
            udsUsa: formatToCurrency(item.udsUsa),
            fitosanitarias: formatToCurrency(item.fitosanitarias),
            otros: formatToCurrency(item.otros ? item.otros : 0),
            dieselExtra: formatToCurrency(
              item.dieselExtra ? item.dieselExtra : 0
            ),
          };
        });

        setDataTable(formatData);
      } else
        modalInformation({
          message,
          callbackConfirm: () => navigation('/routes'),
        });

      return true;
    } catch (error) {
      return false;
    }
  };

  const handleCreateQuote = async (messageValue?: string): Promise<boolean> => {
    try {
      const data = {
        folio: folio ? parseInt(folio) : 0,
        mensaje: messageValue !== '' ? messageValue : '',
      };
      const response: ResponseSendEmail = await _sendQuote({
        body: data,
      });
      const code: Response['code'] = get(response, 'response.code');
      const message: Response['message'] = get(response, 'response.message');

      if (code === 200) {
        handleCloseModal();
        modalSuccess({ message, callbackConfirm: () => navigation('/quotes') });
      } else modalInformation({ message });
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGetRendimientoMarca = async (): Promise<boolean> => {
    try {
      const { payload, response }: any = await _getRendimientoMarcas();
      const code: Response['code'] = response.code;
      const message: Response['message'] = response.message;
      const dataResponse: any[] = payload.data;

      if (code === 200) {
        const marcasArreglo = Object.values(dataResponse);
        const opciones = marcasArreglo.map((marca) => ({
          label: marca,
          value: marca,
        }));
        setMarca(opciones);
      } else {
        modalInformation({ message });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const downloadPdf = (base64Data: string, fileName: string) => {
    if (!/^data:application\/pdf;base64,/.test(base64Data)) {
      console.error('El formato de datos base64 no es válido.');
      return;
    }

    const pdfData = base64Data.replace(/^data:application\/pdf;base64,/, '');

    const byteCharacters = atob(pdfData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleToggleModal = (): void => {
    setOpenDialog(false);
    setUpdateData(null);
    setSelectedValueMarca(null);
    setSelectedValueModelo(null);
    setOther('');
    setSubcontract('');
  };

  const handleModal = (rowData: FormatDataDetailQuote): void => {
    setOpenDialog(!openDialog);
    setUpdateData(rowData);
    handleGetRendimientoMarca();
  };

  const validationSchema = Yup.object().shape({
    description: Yup.string().required('Este campo es obligatorio.'),
  });

  const initialValues = {
    description: '',
  };

  const handleSubmit = async (values: { description: string }) => {
    try {
      handleCreateQuote(values.description);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleConfigMail = () => {
    handleOpenModal({
      fullWidth: true,
      maxWidth: 'xl',
      title: (
        <HeaderTitleModal
          title="Configurar Email"
          handleToggleModal={() => handleCloseModal()}
        />
      ),
      body: (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field name="description">
              {({ field, form }: any) => (
                <Box component="div">
                  <CKEditor
                    editor={ClassicEditor}
                    data={field.value}
                    onChange={(_event, editor) => {
                      const data = editor.getData();
                      form.setFieldValue(field.name, data);
                    }}
                    config={{
                      language: 'es',
                      toolbar: {
                        items: [
                          'undo',
                          'redo',
                          'heading',
                          '|',
                          'bold',
                          'italic',
                          'link',
                          'insertTable',
                          'numberedList',
                          'bulletedList',
                          '|',
                        ],
                      },
                    }}
                  />
                  {form.errors.description && form.touched.description && (
                    <Typography
                      component="p"
                      sx={{ color: 'red', mt: 2, fontSize: '0.8rem' }}
                    >
                      {form.errors.description}
                    </Typography>
                  )}
                </Box>
              )}
            </Field>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'end' }}>
              <Button variant="contained" type="submit">
                Generar Cotización
              </Button>
            </Box>
          </Form>
        </Formik>
      ),
    });
  };

  const handleCancelQuote = async (): Promise<boolean> => {
    try {
      const response = await _cancelQuoteFolio({
        urlParam: isFolio,
      });
      const code: Response['code'] = get(response, 'response.code', 200);
      const message: Response['message'] = get(
        response,
        'response.message',
        ''
      );

      if (code === 200) {
        modalSuccess({ message, callbackConfirm: () => navigation('/quotes') });
      } else {
        modalInformation({ message });
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const onUpdateRendimiento = async (): Promise<boolean> => {
    try {
      const newDataUpdate: any =
        updateData.rendimiento === '0 kms/Lt'
          ? {
              unidadId: selectedValueModelo.id,
              solicitudDetalleId: updateData.id,
              subcontrato: subcontract,
              otros: other,
            }
          : {
              subcontrato: subcontract,
              otros: other,
              solicitudDetalleId: updateData.id,
            };

      const response = await _updateDetailQuote({
        body: newDataUpdate,
      });

      const code: Response['code'] = get(response, 'response.code', 200);
      const message: Response['message'] = get(
        response,
        'response.message',
        ''
      );
      if (code === 200) {
        setOpenDialog(false);
        modalSuccess({
          message,
          callbackConfirm: () => handleGetQuoteFolio(isFolio),
        });
        setOther('');
        setSubcontract('');
      } else {
        modalInformation({ message });
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const columnsTwo = [
    {
      name: 'Origen',
      selector: (row: FormatDataDetailQuote) => row.origen,
    },
    {
      name: 'Destino',
      selector: (row: FormatDataDetailQuote) => row.destino,
    },
    {
      name: 'Dimensiones',
      selector: (row: FormatDataDetailQuote) => row.dimensiones,
    },
    {
      name: 'Tipo de traslado',
      selector: (row: FormatDataDetailQuote) => row.trasladoTipo,
    },
    {
      name: 'Kms',
      selector: (row: FormatDataDetailQuote) => row.kms,
    },
    {
      name: 'Rendimiento',
      selector: (row: FormatDataDetailQuote) => row.rendimiento,
    },
    {
      name: 'Litros',
      selector: (row: FormatDataDetailQuote) => row.litros,
    },
    { name: 'Diesel', selector: (row: FormatDataDetailQuote) => row.diesel },
    {
      name: 'Diesel extra',
      selector: (row: FormatDataDetailQuote) => row.dieselExtra,
    },
    { name: 'Extra', selector: (row: FormatDataDetailQuote) => row.extra },
    { name: 'Comidas', selector: (row: FormatDataDetailQuote) => row.comidas },
    {
      name: 'Pasaje local origen',
      selector: (row: FormatDataDetailQuote) => row.pasajeLocalOrigen,
    },
    {
      name: 'Pasaje local destino',
      selector: (row: FormatDataDetailQuote) => row.pasajeLocalDestino,
    },
    {
      name: 'Pasaje origen',
      selector: (row: FormatDataDetailQuote) => row.pasajeOrigen,
    },
    {
      name: 'Pasaje destino',
      selector: (row: FormatDataDetailQuote) => row.pasajeDestino,
    },
    {
      name: 'Peajes viapass',
      selector: (row: FormatDataDetailQuote) => row.peajesViapass,
    },
    {
      name: 'Seguro traslado',
      selector: (row: FormatDataDetailQuote) => row.seguroTraslado,
    },
    { name: 'Sueldo', selector: (row: FormatDataDetailQuote) => row.sueldo },
    {
      name: 'Pago de estadia',
      selector: (row: FormatDataDetailQuote) => row.pagoEstadia,
    },
    { name: 'Ferry', selector: (row: FormatDataDetailQuote) => row.ferry },
    { name: 'Hotel', selector: (row: FormatDataDetailQuote) => row.hotel },
    { name: 'Vuelo', selector: (row: FormatDataDetailQuote) => row.vuelo },
    { name: 'Taxi', selector: (row: FormatDataDetailQuote) => row.taxi },
    { name: 'UDS/USA', selector: (row: FormatDataDetailQuote) => row.udsUsa },
    {
      name: 'Liberacion de puerto',
      selector: (row: FormatDataDetailQuote) => row.liberacionPuerto,
    },
    {
      name: 'Talachas',
      selector: (row: FormatDataDetailQuote) => row.talachas,
    },
    {
      name: 'Fitosanitarias',
      selector: (row: FormatDataDetailQuote) => row.fitosanitarias,
    },
    { name: 'Urea', selector: (row: FormatDataDetailQuote) => row.urea },
    { name: 'Otros', selector: (row: FormatDataDetailQuote) => row.otros },
    {
      name: 'Subtotal',
      selector: (row: FormatDataDetailQuote) => row.subTotal,
    },
    { name: 'Admon', selector: (row: FormatDataDetailQuote) => row.admon },
    { name: 'Total', selector: (row: FormatDataDetailQuote) => row.total },
    {
      name: 'Inflación',
      selector: (row: FormatDataDetailQuote) => row.inflacion,
    },
    {
      name: 'Financiamiento',
      selector: (row: FormatDataDetailQuote) => row.financiamiento,
    },
    {
      name: 'Ganancia',
      selector: (row: FormatDataDetailQuote) => row.ganancia,
    },
    { name: 'Costo', selector: (row: FormatDataDetailQuote) => row.costo },
    {
      name: 'Acciones',
      cell: (row: any) => (
        <Stack spacing={1} direction="row">
          {row.rendimiento === '0 kms/Lt' && (
            <Tooltip title="Descargar Manual">
              <IconButton
                onClick={() =>
                  downloadPdf(row.manual, `${row.clienteNombre}_manual.pdf`)
                }
              >
                <DownloadOutlined />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Editar Rendimiento">
            <IconButton onClick={() => handleModal(row)}>
              <EditOutlined />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
      grow: 1,
      wrap: true,
    },
  ];

  const handleExportDataQuoteHistorial = (): void => {
    const filteredData = dataTable.map((item) => ({
      Origen: item.origen,
      Destino: item.destino,
      Dimensiones: item.dimensiones,
      'Tipo de traslado': item.trasladoTipo,
      Kms: item.kms,
      Rendimiento: item.rendimiento,
      Litros: item.litros,
      Diesel: item.diesel,
      'Diesel extra': item.dieselExtra,
      Extra: item.extra,
      Comidas: item.comidas,
      'Pasaje local origen': item.pasajeLocalOrigen,
      'Pasaje local destino': item.pasajeLocalDestino,
      'Pasaje origen': item.pasajeOrigen,
      'Pasaje destino': item.pasajeDestino,
      'Peajes viapass': item.peajesViapass,
      'Seguro traslado': item.seguroTraslado,
      Sueldo: item.sueldo,
      'Pago de estadia': item.pagoEstadia,
      Ferry: item.ferry,
      Hotel: item.hotel,
      Vuelo: item.vuelo,
      Taxi: item.taxi,
      'UDS/USA': item.udsUsa,
      'Liberacion de puerto': item.liberacionPuerto,
      Talachas: item.talachas,
      Fitosanitarias: item.fitosanitarias,
      Urea: item.urea,
      Otros: item.otros,
      Subtotal: item.subTotal,
      Admon: item.admon,
      Total: item.total,
      Inflación: item.inflacion,
      Financiamiento: item.financiamiento,
      Ganancia: item.ganancia,
      Costo: item.costo,
    }));

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Cotizaciones');
    XLSX.writeFile(workbook, 'cotizaciones.xlsx');
  };

  const handleSubcontractChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setSubcontract(value);
  };

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setOther(value);
  };

  return (
    <>
      <Grid sx={{ marginBottom: 2, pl: 2, pr: 2 }}>
        <Grid
          container
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Grid sx={{ display: 'column' }}>
            <Typography variant="h4" sx={{ letterSpacing: '1px' }}>
              Cotizador
            </Typography>
          </Grid>
          <Grid>
            <Tooltip title="Página anterior">
              <IconButton onClick={() => navigation(-1)}>
                <ArrowBack sx={{ fontSize: 30 }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 5,
            mb: 5,
          }}
        >
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={1}>
              <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
                Cliente:
              </Typography>
              <Typography sx={{ fontSize: '18px' }}>
                {state.clientName}
              </Typography>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: 'flex', justifyContent: 'end' }}
          >
            <Button
              variant="contained"
              color="inherit"
              sx={{ p: 1.5, letterSpacing: '1.2px' }}
              onClick={handleExportDataQuoteHistorial}
              endIcon={<ExitToAppOutlined />}
              // disabled={pathname === '/quote-history' && data?.length === 0}
            >
              Exportar Excel
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <CustomTable columns={columnsTwo} data={dataTable} />
      <Container
        maxWidth="xl"
        sx={{ mt: 5, display: 'flex', justifyContent: 'end' }}
      >
        <Stack spacing={3} direction="row">
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => handleCancelQuote()}
          >
            Cancelar Cotización
          </Button>
          <Button variant="contained" onClick={() => handleConfigMail()}>
            Enviar Cotización
          </Button>
        </Stack>
      </Container>
      <Dialog open={openDialog}>
        <Box sx={{ padding: 1 }}>
          <Box sx={{ width: 1, display: 'flex', justifyContent: 'end' }}>
            <IconButton onClick={() => handleToggleModal()}>
              <Tooltip title="Cerrar">
                <Close />
              </Tooltip>
            </IconButton>
          </Box>
          <DialogTitle
            sx={{ width: 1, display: 'flex', justifyContent: 'center' }}
          >
            {`EDITAR ${
              updateData?.rendimiento === '0 kms/Lt' ? 'RENDIMIENTO' : ' EXTRAS'
            }`}
          </DialogTitle>
          <DialogContent sx={{ mb: 2 }}>
            <Box sx={{ mt: 2 }}>
              {updateData?.rendimiento === '0 kms/Lt' ? (
                <Stack spacing={2}>
                  <Autocomplete
                    value={selectedValueMarca}
                    onChange={(_event: any, newValue: any | null) => {
                      setSelectedValueMarca(newValue);
                    }}
                    options={marca}
                    sx={{ width: '320px' }}
                    renderInput={(params) => (
                      <TextField {...params} label="Seleccione una marca" />
                    )}
                  />
                  <Autocomplete
                    value={selectedValueModelo}
                    onChange={(_event: any, newValue: any | null) => {
                      setSelectedValueModelo(newValue);
                    }}
                    options={modelo}
                    sx={{ width: '320px' }}
                    getOptionLabel={(option: any) => option.nombre}
                    renderInput={(params) => (
                      <TextField {...params} label="Seleccione un modelo" />
                    )}
                  />
                  <TextField
                    label="Subcontrato"
                    value={subcontract}
                    onChange={handleSubcontractChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">$</InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="Otros"
                    value={other}
                    onChange={handleOtherChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">$</InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              ) : (
                <Stack spacing={2}>
                  <TextField
                    label="Subcontrato"
                    value={subcontract}
                    onChange={handleSubcontractChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">$</InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label="Otros"
                    value={other}
                    onChange={handleOtherChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">$</InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              )}
            </Box>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'end' }}>
              <Button
                variant="contained"
                onClick={() => onUpdateRendimiento()}
                disabled={
                  updateData?.rendimiento !== '0 kms/Lt'
                    ? false
                    : selectedValueModelo === null
                }
              >
                Guardar cambios
              </Button>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
};

export { DetailQuote };

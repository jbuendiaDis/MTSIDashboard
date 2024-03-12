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
} from '@mui/material';
import { DownloadOutlined, EditOutlined, Close } from '@mui/icons-material';
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
  const isFolio: string | undefined = folio ? folio : '';
  const navigation = useNavigate();

  const _getQuoteFolio = useApi({
    endpoint: '/v2/cotizacion',
    method: 'get',
  });

  const _cancelQuoteFolio = useApi({
    endpoint: '/quotes01/cancel',
    method: 'post',
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
  };

  const handleModal = (rowData: any): void => {
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
      const newDataUpdate = {
        unidadId: selectedValueModelo.id,
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
      selector: (row: any) => row.origen,
    },
    {
      name: 'Destino',
      selector: (row: any) => row.destino,
    },
    {
      name: 'Dimensiones',
      selector: (row: any) => row.dimensiones,
    },
    {
      name: 'Tipo de traslado',
      selector: (row: any) => row.trasladoTipo,
    },
    {
      name: 'Kms',
      selector: (row: any) => row.kms,
    },
    {
      name: 'Rendimiento',
      selector: (row: any) => row.rendimiento,
    },
    {
      name: 'Litros',
      selector: (row: any) => row.litros,
    },
    { name: 'Diesel', selector: (row: any) => row.diesel },
    { name: 'Diesel extra', selector: (row: any) => row.dieselExtra },
    { name: 'Extra', selector: (row: any) => row.extra },
    { name: 'Comidas', selector: (row: any) => row.comidas },
    { name: 'Pasaje origen', selector: (row: any) => row.pasajeOrigen },
    { name: 'Pasaje destino', selector: (row: any) => row.pasajeDestino },
    { name: 'Peajes viapass', selector: (row: any) => row.peajesViapass },
    { name: 'Seguro traslado', selector: (row: any) => row.seguroTraslado },
    { name: 'Sueldo', selector: (row: any) => row.sueldo },
    { name: 'Pago de estadia', selector: (row: any) => row.pagoEstadia },
    { name: 'Ferry', selector: (row: any) => row.ferry },
    { name: 'Hotel', selector: (row: any) => row.hotel },
    { name: 'Vuelo', selector: (row: any) => row.vuelo },
    { name: 'Taxi', selector: (row: any) => row.taxi },
    { name: 'UDS/USA', selector: (row: any) => row.udsUsa },
    {
      name: 'Liberacion de puerto',
      selector: (row: any) => row.liberacionPuerto,
    },
    { name: 'Talachas', selector: (row: any) => row.talachas },
    { name: 'Fitosanitarias', selector: (row: any) => row.fitosanitarias },
    { name: 'Urea', selector: (row: any) => row.urea },
    { name: 'Otros', selector: (row: any) => row.otros },
    { name: 'Subtotal', selector: (row: any) => row.subTotal },
    { name: 'Admon', selector: (row: any) => row.admon },
    { name: 'Total', selector: (row: any) => row.total },
    { name: 'Inflación', selector: (row: any) => row.inflacion },
    { name: 'Financiamiento', selector: (row: any) => row.financiamiento },
    { name: 'Ganancia', selector: (row: any) => row.ganancia },
    { name: 'Costo', selector: (row: any) => row.costo },
    {
      name: 'Acciones',
      cell: (row: any) =>
        row.rendimiento === '0 kms/Lt' && (
          <Stack spacing={1} direction="row">
            <Tooltip title="Descargar Manual">
              <IconButton
                onClick={() =>
                  downloadPdf(row.manual, `${row.clienteNombre}_manual.pdf`)
                }
              >
                <DownloadOutlined />
              </IconButton>
            </Tooltip>
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

  return (
    <>
      <Container maxWidth="xl" sx={{ marginBottom: 2 }}>
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
        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: 3, display: 'flex', alignItems: 'center' }}
        >
          <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
            Cliente:
          </Typography>
          <Typography sx={{ fontSize: '18px' }}>{state.clientName}</Typography>
        </Stack>
      </Container>
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
              <Close />
            </IconButton>
          </Box>
          <DialogTitle
            sx={{ width: 1, display: 'flex', justifyContent: 'center' }}
          >
            EDITAR RENDIEMIENTO
          </DialogTitle>
          <DialogContent sx={{ mb: 2 }}>
            <Box sx={{ mt: 2 }}>
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
              </Stack>
            </Box>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'end' }}>
              <Button
                variant="contained"
                onClick={() => onUpdateRendimiento()}
                disabled={selectedValueModelo === null}
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

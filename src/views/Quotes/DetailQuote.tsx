/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  FormatDataDetailQuote,
  PayloadDetailQuote,
  ResponseDetailQuote,
  ResponseSendEmail,
} from './types';
import { useApi } from '../../hooks/useApi';
import { Column, ModalContextType, Response } from '../../models';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Table } from '../../components/Table';
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

const DetailQuote = () => {
  const location = useLocation();
  const { state } = location;
  const { folio } = useParams();
  const { handleOpenModal, handleCloseModal }: ModalContextType = useModal();
  const { modalInformation, modalSuccess } = useModalConfirmation();
  const [dataTable, setDataTable] = useState<FormatDataDetailQuote[]>([]);
  const isFolio: string | undefined = folio ? folio : '';
  const navigation = useNavigate();

  const _getQuoteFolio = useApi({
    endpoint: '/v2/cotizacion',
    method: 'get',
  });

  const _sendQuote = useApi({
    endpoint: '/v1/solicitud/details/send',
    method: 'post',
  });

  useEffect(() => {
    if (isFolio !== '') handleGetQuoteFolio(isFolio);
  }, [isFolio]);

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
            litros: `${item.litros} Lts`,
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
        modalSuccess({ message });
      } else modalInformation({ message });
      return true;
    } catch (error) {
      return false;
    }
  };

  const columns: Column[] = [
    { id: 'origen', label: 'Origen', align: 'left' },
    { id: 'destino', label: 'Destino', align: 'left' },
    { id: 'kms', label: 'Kms', align: 'left' },
    { id: 'rendimiento', label: 'Rendimiento', align: 'left' },
    { id: 'litros', label: 'Litros', align: 'left' },
    { id: 'diesel', label: 'Diesel', align: 'left' },
    { id: 'extra', label: 'Diesel extra', align: 'left' },
    { id: 'comidas', label: 'Comidas', align: 'left' },
    { id: 'pasajeOrigen', label: 'Pasaje origen', align: 'left' },
    { id: 'pasajeDestino', label: 'Pasaje destino', align: 'left' },
    { id: 'peajesViapass', label: 'Peajes viapass', align: 'left' },
    { id: 'seguroTraslado', label: 'Seguro traslado', align: 'left' },
    { id: 'sueldo', label: 'Sueldo', align: 'left' },
    { id: 'pagoEstadia', label: 'Pago de estadia', align: 'left' },
    { id: 'ferry', label: 'Ferry', align: 'left' },
    { id: 'hotel', label: 'Hotel', align: 'left' },
    { id: 'vuelo', label: 'Vuelo', align: 'left' },
    { id: 'taxi', label: 'Taxi', align: 'left' },
    { id: 'udsUsa', label: 'UDS/USA', align: 'left' },
    { id: 'liberacionPuerto', label: 'Liberacion de puerto', align: 'left' },
    { id: 'talachas', label: 'Talachas', align: 'left' },
    { id: 'fitosanitarias', label: 'Fitosanitarias', align: 'left' },
    { id: 'urea', label: 'Urea', align: 'left' },
    { id: 'otros', label: 'Extra', align: 'left' },
    { id: 'subTotal', label: 'Subtotal', align: 'left' },
    { id: 'admon', label: 'Admon', align: 'left' },
    { id: 'total', label: 'Total', align: 'left' },
    { id: 'inflacion', label: 'Inflación', align: 'left' },
    { id: 'costo', label: 'Costo', align: 'left' },
    { id: 'financiamiento', label: 'Financiamiento', align: 'left' },
    { id: 'ganancia', label: 'Ganancia', align: 'left' },
  ];

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
      <Table showCheckboxes={false} data={dataTable} columns={columns} />
      <Container
        maxWidth="xl"
        sx={{ mt: 5, display: 'flex', justifyContent: 'end' }}
      >
        <Stack spacing={3} direction="row">
          <Button variant="contained" onClick={() => handleConfigMail()}>
            Enviar Cotización
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export { DetailQuote };

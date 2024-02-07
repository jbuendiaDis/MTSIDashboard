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
} from './types';
import { useApi } from '../../hooks/useApi';
import { Column, ModalContextType, Response } from '../../models';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Table } from '../../components/Table';
import { formatToCurrency } from '../../utils/amountFormater';
import { useModal } from '../../components/Modal';
import { HeaderTitleModal } from '../../components/Modal/HeaderTitleModal';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/Input/Input';
import { ArrowBack } from '@mui/icons-material';

const DetailQuote = () => {
  const location = useLocation();
  const { state } = location;
  const { folio } = useParams();
  const { handleOpenModal, handleCloseModal }: ModalContextType = useModal();
  const [dataTable, setDataTable] = useState<FormatDataDetailQuote[]>([]);
  const isFolio: string | undefined = folio ? folio : '';
  const navigation = useNavigate();

  const _getQuoteFolio = useApi({
    endpoint: '/quotes01',
    method: 'get',
  });

  const _sendQuote = useApi({
    endpoint: '/v1/emails/quote/details/send',
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
            pagoEstadia: formatToCurrency(item.pagoEstadia),
            pasajeDestino: formatToCurrency(item.pasajeDestino),
            pasajeOrigen: formatToCurrency(item.pasajeOrigen),
            peajesViapass: formatToCurrency(item.peajesViapass),
            rendimiento: formatToCurrency(item.rendimiento),
            seguroTraslado: formatToCurrency(item.seguroTraslado),
            subTotal: formatToCurrency(item.subTotal),
            sueldo: formatToCurrency(item.sueldo),
            total: formatToCurrency(item.total),
          };
        });

        setDataTable(formatData);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleCreateQuote = async (message?: string): Promise<boolean> => {
    try {
      const data = {
        folio: folio ? parseInt(folio) : 0,
        mensaje: message !== '' ? message : '',
      };
      const response = await _sendQuote({
        body: data,
      });

      console.log('RES', response);
      return true;
    } catch (error) {
      return false;
    }
  };

  const columns: Column[] = [
    { id: 'folio', label: 'Folio', align: 'left' },
    { id: 'origen', label: 'Origen', align: 'left' },
    { id: 'destino', label: 'Destino', align: 'left' },
    { id: 'kms', label: 'Kms', align: 'left' },
    { id: 'rendimiento', label: 'Rendimiento', align: 'left' },
    { id: 'litros', label: 'Litros', align: 'left' },
    { id: 'diesel', label: 'Diesel', align: 'left' },
    { id: 'comidas', label: 'Comidas', align: 'left' },
    { id: 'pasajeOrigen', label: 'Pasaje Origen', align: 'left' },
    { id: 'pasajeDestino', label: 'Pasaje Destino', align: 'left' },
    { id: 'peajesViapass', label: 'Diesel', align: 'left' },
    { id: 'seguroTraslado', label: 'Seguro Traslado', align: 'left' },
    { id: 'subTotal', label: 'Subtotal', align: 'left' },
    { id: 'admon', label: 'Admon', align: 'left' },
    { id: 'total', label: 'Total', align: 'left' },
    { id: 'inflacion', label: 'Inflación', align: 'left' },
    { id: 'financiamiento', label: 'Financiamiento', align: 'left' },
    { id: 'ganancia', label: 'Ganancia', align: 'left' },
    { id: 'costo', label: 'Costo', align: 'left' },
    { id: 'cliente', label: 'Cliente', align: 'left' },
  ];

  const validationSchema = Yup.object().shape({
    description: Yup.string().required('Este campo es obligatorio.'),
  });

  const initialValues = {
    description: '',
  };

  const handleSubmit = async (values: { description: string }) => {
    try {
      console.log('VALUES', values);
      handleCreateQuote(values.description);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleConfigMail = () => {
    handleOpenModal({
      fullWidth: true,
      maxWidth: 'sm',
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
            <Input
              fullWidth
              multiline
              rows={4}
              placeholder="Descripción..."
              name="description"
            />
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
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => handleConfigMail()}
          >
            Configurar email
          </Button>
          <Button variant="contained" onClick={() => handleCreateQuote()}>
            Generar Cotización
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export { DetailQuote };

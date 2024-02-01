/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { QuotesStyles } from './QuotesStyles';
import {
  PayloadDetailQuote,
  ResponseDetailQuote,
  //  ResponseDetailQuote
} from './types';
import { formatToCurrency } from '../../utils/amountFormater';
import { useApi } from '../../hooks/useApi';
import { Response } from '../../models';
import { useParams } from 'react-router-dom';
import { Table } from '../../components/Table';

const DetailQuote = () => {
  const { id } = useParams();
  const [dataTable, setDataTable] = useState<PayloadDetailQuote['data']>([]);
  const idQuote: string | undefined = id ? id : '';

  const _getQuoteFolio = useApi({
    endpoint: '/quotes01',
    method: 'get',
  });

  useEffect(() => {
    if (idQuote !== '') handleGetQuoteFolio(idQuote);
  }, [idQuote]);

  const handleGetQuoteFolio = async (id: string): Promise<boolean> => {
    try {
      console.log('id', id);
      const { payload, response }: ResponseDetailQuote = await _getQuoteFolio({
        // urlParam: id,
        urlParam: 2,
      });
      const dataResponse: PayloadDetailQuote['data'] = payload.data;
      const code: Response['code'] = response.code;

      if (code === 200) {
        setDataTable(dataResponse);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const style = QuotesStyles;

  console.log('STATE', dataTable);

  return (
    <>
      <Table
        showCheckboxes={false}
        tableHead
        title="Cotizador"
        data={[]}
        columns={[]}
      />
      {/* {dataQuote.map((item) => (
        <>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Typography component="span" sx={style.textInfo}>
                Datos Generales:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Stack spacing={2} direction="row">
                <Typography sx={style.textDescription}>Cliente:</Typography>
                <Typography sx={style.textSize}>Nombre Cliente</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Stack spacing={2} direction="row">
                <Typography sx={style.textDescriptionOrigen}>
                  Origen:
                </Typography>
                <Typography sx={style.textSize}>
                  {item?.origen ? item?.origen : '--'}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Stack spacing={2} direction="row">
                <Typography sx={style.textDescriptionDestino}>
                  Destino:
                </Typography>
                <Typography sx={style.textSize}>
                  {item?.destino ? item?.destino : '--'}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography component="span" sx={style.textInfo}>
                Rendimientos:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Stack spacing={2} direction="row">
                <Typography sx={style.textDescription}>Rendimiento:</Typography>
                <Typography sx={style.textSize}>
                  {item?.rend ? `${item.rend} Lts` : '--'}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Stack spacing={2} direction="row">
                <Typography sx={style.textDescription}>Litros:</Typography>
                <Typography sx={style.textSize}>
                  {item?.lts ? item.lts : '--'}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Stack spacing={2} direction="row">
                <Typography sx={style.textDescription}>Kilometros:</Typography>
                <Typography sx={style.textSize}>
                  {item.kms ? `${item.kms} kms` : '-- kms'}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Stack spacing={2} direction="row">
                <Typography sx={style.textDescription}>Diesel:</Typography>
                <Typography sx={style.textSize}>
                  {item?.precioDiesel
                    ? `${formatToCurrency(item.precioDiesel)}`
                    : '$ --'}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Typography component="span" sx={style.textInfo}>
                Gastos:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Stack spacing={2} direction="row">
                <Typography sx={style.textDescriptionOrigen}>
                  Pasaje Origen:
                </Typography>
                <Typography sx={style.textSize}>$ --</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Stack spacing={2} direction="row">
                <Typography sx={style.textDescriptionDestino}>
                  Pasaje Destino:
                </Typography>
                <Typography sx={style.textSize}>$ --</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Stack spacing={2} direction="row">
                <Typography sx={style.textDescription}>Sueldo:</Typography>
                <Typography sx={style.textSize}>
                  {item?.costoSueldo
                    ? `${formatToCurrency(item.costoSueldo)}`
                    : '$ --'}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Stack spacing={2} direction="row">
                <Typography sx={style.textDescription}>Comidas:</Typography>
                <Typography sx={style.textSize}>
                  {item?.costoComidas
                    ? `${formatToCurrency(item.costoComidas)}`
                    : '$ --'}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Stack spacing={2} direction="row">
                <Typography sx={style.textDescription}>
                  Pasajes/Viapass:
                </Typography>
                <Typography sx={style.textSize}>
                  {item?.costoPasajes
                    ? `${formatToCurrency(item.costoPasajes)}`
                    : '$ --'}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Stack spacing={2} direction="row">
                <Typography sx={style.textDescription}>
                  Seguro de Traslado:
                </Typography>
                <Typography sx={style.textSize}>$ --</Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={4} md={3}>
              <Stack spacing={2} direction="row">
                <Typography sx={style.textDescription}>
                  Pago de Estadia:
                </Typography>
                <Typography sx={style.textSize}>
                  {item?.hoteles ? `${formatToCurrency(item.hoteles)}` : '$ --'}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Stack spacing={2} direction="row">
                <Typography sx={style.textDescription}>Admon:</Typography>
                <Typography sx={style.textSize}>$ --</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Stack spacing={2} direction="row">
                <Typography sx={style.textDescription}>Inflacion:</Typography>
                <Typography sx={style.textSize}>
                  {item?.costoInflacion
                    ? `${formatToCurrency(item.costoInflacion)}`
                    : '$ --'}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Stack spacing={2} direction="row">
                <Typography sx={style.textDescription}>
                  Financiamiento:
                </Typography>
                <Typography sx={style.textSize}>
                  {item?.financiamiento
                    ? `${formatToCurrency(item.financiamiento)}`
                    : '$ --'}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Stack spacing={2} direction="row">
                <Typography sx={style.textDescription}>Ganancia:</Typography>
                <Typography sx={style.textSize}>
                  {item?.ganancia
                    ? `${formatToCurrency(item.ganancia)}`
                    : '$ --'}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Stack spacing={2} direction="row">
                <Typography sx={style.textDescription}>Costo:</Typography>
                <Typography sx={style.textSize}>
                  {item?.costoTotal
                    ? `${formatToCurrency(item.costoTotal)}`
                    : '$ --'}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
          <Stack
            spacing={5}
            justifyContent="end"
            direction="row"
            sx={{ mt: 2 }}
          >
            <Grid>
              <Stack spacing={0.5} direction="column">
                <Typography sx={style.textDescription}>Sub Total</Typography>
                <Typography sx={style.textSize}>
                  {item?.subtotal
                    ? `${formatToCurrency(item.subtotal)}`
                    : '$ --'}
                </Typography>
              </Stack>
            </Grid>
            <Grid>
              <Stack spacing={0.5} direction="column">
                <Typography sx={style.textDescription}>Total</Typography>
                <Typography sx={style.textSize}>
                  {item?.total ? `${formatToCurrency(item.total)}` : '$ --'}
                </Typography>
              </Stack>
            </Grid>
          </Stack>
        </>
      ))} */}
    </>
  );
};

export { DetailQuote };

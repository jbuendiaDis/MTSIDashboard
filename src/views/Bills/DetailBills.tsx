import { Divider, Grid, Stack, Typography } from '@mui/material';
// import { MoneyOffOutlined } from '@mui/icons-material';
import { TollExpensesData } from './types';
import { BillsStyles } from './BillsStyles';
// import { formatToCurrency } from '../../utils/amountFormater';

interface DetailBillsProps {
  detailBillsData: TollExpensesData['data'];
}

const DetailBills = ({ detailBillsData }: DetailBillsProps) => {
  const style = BillsStyles;
  // console.log('DETAIL', detailBillsData);

  return (
    <>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Typography sx={style.textDescriptionOrigen}>Origen:</Typography>
            <Typography sx={{ fontSize: '14px' }}>
              {detailBillsData.nombreOrigen}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Typography sx={style.textDescriptionDestino}>Destino:</Typography>
            <Typography sx={{ fontSize: '14px' }}>
              {detailBillsData.nombreDestino}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Typography sx={style.textDescriptionTotal}>
              Total de Peajes:
            </Typography>
            <Typography sx={{ fontSize: '14px' }}>
              {detailBillsData.peajes.length}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2, mb: 2 }} />
      {/* {detailBillsData.peajes.length > 0 ? (
        detailBillsData.peajes.map((peaje) => (
          <>
            <Grid container key={peaje._id}>
              <Grid xs={12} sx={{ m: '5px 0px' }}>
                <Typography component="span" sx={style.textInfo}>
                  Peajes:
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack direction="row" spacing={1}>
                  <Typography component="span" sx={style.textDescription}>
                    Kilómetros:
                  </Typography>
                  <Typography sx={{ fontSize: '14px' }}>
                    {peaje.kms} kms
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack direction="row" spacing={1}>
                  <Typography component="span" sx={style.textDescription}>
                    Tipo de Unidad:
                  </Typography>
                  <Typography sx={{ fontSize: '14px' }}>
                    {peaje.tipoUnidad}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack direction="row" spacing={1}>
                  <Typography component="span" sx={style.textDescription}>
                    Total de Peajes:
                  </Typography>
                  <Typography sx={{ fontSize: '14px' }}>
                    {formatToCurrency(peaje.totalPeajes)}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sx={{ mt: 1, mb: 0.5 }}>
                <Typography component="span" sx={style.textInfo}>
                  Puntos:
                </Typography>
              </Grid>
              {peaje.puntos.map((punto) => (
                <Grid container key={punto._id}>
                  <Grid item xs={12} md={4}>
                    <Stack spacing={1} direction="row">
                      <Typography sx={style.textDescription}>
                        Casetas:
                      </Typography>
                      <Typography sx={{ fontSize: '14px' }}>
                        {punto.casetas}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Stack spacing={1} direction="row">
                      <Typography sx={style.textDescription}>
                        Nombre Caseta:
                      </Typography>
                      <Typography sx={{ fontSize: '14px' }}>
                        {punto.nombreCaseta}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Stack spacing={1} direction="row">
                      <Typography sx={style.textDescription}>Costo:</Typography>
                      <Typography sx={{ fontSize: '14px' }}>
                        {formatToCurrency(punto.costo)}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ mt: 2, mb: 2 }} />
          </>
        ))
      ) : (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <MoneyOffOutlined sx={{ mt: 2, mb: 2, width: 60, height: 60 }} />

          <Typography sx={{ mt: 2, mb: 2, fontWeight: 600 }} variant="h4">
            No hay información por mostrar
          </Typography>
        </Grid>
      )} */}
    </>
  );
};

export { DetailBills };

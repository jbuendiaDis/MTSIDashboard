import { Divider, Grid, Stack, Typography } from '@mui/material';
import { RoutesStyles } from './RoutesStyles';
import { DataTolls } from './types';
import { formatToCurrency } from '../../utils/amountFormater';
import { MoneyOffOutlined } from '@mui/icons-material';

interface DetailRoutesProps {
  detailDotsData: DataTolls;
}

export const DetailDots = ({ detailDotsData }: DetailRoutesProps) => {
  const style = RoutesStyles;

  return (
    <div>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Typography sx={style.textDescriptionOrigen}>
              Estado Origen:
            </Typography>
            <Typography sx={{ fontSize: '14px' }}>
              {detailDotsData.nombreOrigen}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Typography sx={style.textDescriptionDestino}>
              Estado Destino:
            </Typography>
            <Typography sx={{ fontSize: '14px' }}>
              {detailDotsData.nombreDestino}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Typography sx={style.textDescriptionTotal}>
              Total de Peajes:
            </Typography>
            <Typography sx={{ fontSize: '14px' }}>
              {formatToCurrency(detailDotsData.totalPeajes)}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Typography sx={style.textDescriptionUnidad}>
              Tipo de Unidad:
            </Typography>
            <Typography sx={{ fontSize: '14px' }}>
              {detailDotsData.tipoUnidad}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Typography sx={style.textDescriptionTotal}>
              Total Kilometros:
            </Typography>
            <Typography sx={{ fontSize: '14px' }}>
              {`${detailDotsData.kms} kms`}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Grid container>
        <Grid item xs={12}>
          <Typography sx={style.textInfo}>Puntos:</Typography>
        </Grid>
        {detailDotsData.puntos.length > 0 ? (
          detailDotsData.puntos.map((punto) => (
            <Grid
              container
              spacing={1}
              key={`${punto._id} - ${punto.nombreCaseta}`}
              sx={{ mt: 1 }}
            >
              <Grid item xs={12} sm={6} md={3}>
                <Stack spacing={1} direction="row">
                  <Typography sx={style.textDescription}>Casetas:</Typography>
                  <Typography sx={{ fontSize: '14px' }}>
                    {punto.casetas}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
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
        )}
      </Grid>
    </div>
  );
};

import { Divider, Grid, Stack, Typography } from '@mui/material';
import { QuotesStyles } from './QuotesStyles';

const DetailQuote = () => {
  const style = QuotesStyles;

  return (
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
            <Typography sx={style.textDescriptionOrigen}>Origen:</Typography>
            <Typography sx={style.textSize}>Estado Origen</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Stack spacing={2} direction="row">
            <Typography sx={style.textDescriptionDestino}>Destino:</Typography>
            <Typography sx={style.textSize}>Estado Destino</Typography>
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
            <Typography sx={style.textSize}>100 Lts</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Stack spacing={2} direction="row">
            <Typography sx={style.textDescription}>Litros:</Typography>
            <Typography sx={style.textSize}>100 Lts</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Stack spacing={2} direction="row">
            <Typography sx={style.textDescription}>Kilometros:</Typography>
            <Typography sx={style.textSize}>100 kms</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Stack spacing={2} direction="row">
            <Typography sx={style.textDescription}>Diesel:</Typography>
            <Typography sx={style.textSize}>$ --</Typography>
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
            <Typography sx={style.textSize}>$ --</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Stack spacing={2} direction="row">
            <Typography sx={style.textDescription}>Comidas:</Typography>
            <Typography sx={style.textSize}>$ --</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Stack spacing={2} direction="row">
            <Typography sx={style.textDescription}>Pasajes/Viapass:</Typography>
            <Typography sx={style.textSize}>$ --</Typography>
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
            <Typography sx={style.textDescription}>Pago de Estadia:</Typography>
            <Typography sx={style.textSize}>$ --</Typography>
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
            <Typography sx={style.textSize}>$ --</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Stack spacing={2} direction="row">
            <Typography sx={style.textDescription}>Financiamiento:</Typography>
            <Typography sx={style.textSize}>$ --</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Stack spacing={2} direction="row">
            <Typography sx={style.textDescription}>Ganancia:</Typography>
            <Typography sx={style.textSize}>$ --</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Stack spacing={2} direction="row">
            <Typography sx={style.textDescription}>Costo:</Typography>
            <Typography sx={style.textSize}>$ --</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* <Grid item xs={12} sm={4} md={3}>
        <Stack spacing={2} direction="row">
          <Typography sx={style.textDescription}>Sub Total:</Typography>
          <Typography sx={style.textSize}>$100.00</Typography>
          </Stack>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
          <Stack spacing={2} direction="row">
          <Typography sx={style.textDescription}>Total:</Typography>
          <Typography sx={style.textSize}>$100.00</Typography>
          </Stack>
        </Grid> */}
      </Grid>

      <Stack spacing={5} justifyContent="end" direction="row" sx={{ mt: 2 }}>
        <Grid>
          <Stack spacing={0.5} direction="column">
            <Typography sx={style.textDescription}>Sub Total</Typography>
            <Typography sx={style.textSize}>$ --</Typography>
          </Stack>
        </Grid>
        <Grid>
          <Stack spacing={0.5} direction="column">
            <Typography sx={style.textDescription}>Total</Typography>
            <Typography sx={style.textSize}>$ --</Typography>
          </Stack>
        </Grid>
      </Stack>
    </>
  );
};

export default DetailQuote;

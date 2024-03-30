import { Divider, Grid, Stack, Typography } from '@mui/material';
import { TollExpensesData } from './types';
import { BillsStyles } from './BillsStyles';

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
    </>
  );
};

export { DetailBills };

import { Theme } from '@mui/material';

export const QuotesStyles = {
  textInfo: {
    letterSpacing: '1px',
    fontSize: '14px',
    color: (theme: Theme) => theme.palette.grey[500],
  },
  textDescription: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  textDescriptionOrigen: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: (theme: Theme) => theme.palette.success.main,
  },
  textDescriptionDestino: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: (theme: Theme) => theme.palette.error.main,
  },
  textDescriptionTotal: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: (theme: Theme) => theme.palette.info.dark,
  },
  textSize: {
    fontSize: '14px',
  },
};

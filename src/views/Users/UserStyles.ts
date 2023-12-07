import { Theme } from '@mui/material';

export const UserStyles = {
  textDescription: {
    letterSpacing: '1px',
    fontSize: '16px',
    color: (theme: Theme) => theme.palette.grey[500],
  },
  contentButtons: {
    mt: 10,
    width: 1,
    display: 'flex',
    justifyContent: 'end',
  },
  // contentInfoText: {
  //   width: { xs: '35%', sm: '20%' },
  //   display: 'flex',
  //   alignItems: 'center',
  //   cursor: 'pointer',
  //   '&:hover': {
  //     color: (theme: Theme) => theme.palette.primary.main,
  //     textDecoration: 'underline',
  //   },
  // },
  // infoText: {
  //   letterSpacing: '0.8px',
  //   mt: 0.5,
  //   fontSize: '13px',
  //   '&:hover': {
  //     color: (theme: Theme) => theme.palette.primary.main,
  //     //   textDecoration: 'underline',
  //   },
  // },
};

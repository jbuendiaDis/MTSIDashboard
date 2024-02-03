import { Theme } from '@mui/material';

export const UserStyles = {
  textDescription: {
    letterSpacing: '1px',
    fontSize: '16px',
    color: (theme: Theme) => theme.palette.grey[500],
  },
  contentButtons: {
    mt: 3,
    width: 1,
    display: 'flex',
    justifyContent: 'end',
  },
};

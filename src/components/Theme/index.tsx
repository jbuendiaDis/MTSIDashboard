import { useMemo, ReactNode } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { palette } from './palette';
import { shadows } from './shadows';
import { overrides } from './overrides';
import { typography } from './typography';
import { customShadows } from './custom-shadows';

// ----------------------------------------------------------------------

interface ThemeProviderProps {
  children: ReactNode;
}

// interface ThemeProps {
//   breakpoints: any, 
//   components:  any, 
//   customShadows: any, 
//   mixins: any, 
//   palette: any, 
//   shadows: any, 
//   shape: {
//       borderRadius: number
//   }, 
//   spacing:  any,
//   transitions: any, 
//   typography: any, 
//   unstable_sx: any, 
//   unstable_sxConfig: any, 
//   zIndex: any
// }

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const memoizedValue: any = useMemo(
    () => ({
      palette: palette(),
      typography: typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    []
  );

  const theme: any = createTheme(memoizedValue);

  theme.components = overrides(theme)

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

import { ReactNode, useState, useMemo, useEffect } from 'react';
import { Skins } from '../../models/theme';
import { ThemeContext as ThemeContextType } from '../../models/theme';
import { ThemeContext } from './ThemeContext';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material';
import { getItem } from '../../utils/persistentStorage';
import { Theme } from '@emotion/react';
import { themeConfig } from '../../providers/Theme/config';
// import { themeConfig } from '../../providers/theme/config';

interface Props {
  children: ReactNode;
  defaultTheme: Skins;
}

const ThemeProvider = ({ children, defaultTheme }: Props) => {
  const [theme, setTheme] = useState<Skins>(defaultTheme);
  const mandatoryAppTheme: Skins = theme;

  useEffect(() => {
    const activeTheme: Skins =
      getItem('theme') === Skins.dark ? Skins.dark : Skins.light;

    setTheme(activeTheme || defaultTheme);
  }, [defaultTheme]);

  const contextValue: ThemeContextType = useMemo(
    () => ({
      theme,
      availableSkins: { dark: Skins.dark, light: Skins.light },
      handleChangeTheme: (theme: Skins): void => setTheme(theme),
    }),
    [theme]
  );

  const materialTheme: Theme = useMemo(() => {
    const selectedSkin =
      mandatoryAppTheme === Skins.light ? Skins.light : Skins.dark;

    const palette: any = {
      ...themeConfig[selectedSkin].palette,
      type: selectedSkin,
    };

    const skin: any = {
      // shadows: themeConfig.getShadows(palette),
      ...themeConfig[selectedSkin],
      ...themeConfig.common,
      palette,
    };

    return createTheme({
      ...skin,
      props: themeConfig.getProps(skin),
    });
  }, [mandatoryAppTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MUIThemeProvider theme={materialTheme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeProvider };

import { breakpoints } from './breakpoints';
import { common } from './common';
import { light } from './light';
import { dark } from './dark';
import { getProps } from './props';
import { getShadows } from './shadows';

interface ThemeConfig {
  breakpoints: any;
  common: any;
  light: any;
  dark: any;
  getProps: (theme: any) => any;
  // getShadows: (pallete: any) => any;
}

export const themeConfig: ThemeConfig = {
  breakpoints,
  common,
  light,
  dark,
  getProps,
  // getShadows,
};

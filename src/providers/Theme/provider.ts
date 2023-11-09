import { Skins } from '../../models';
import { themeConfig } from './config';

export const skins = {
  [Skins.light]: {
    ...themeConfig.common,
    ...themeConfig.light,
  },
  [Skins.dark]: {
    ...themeConfig.common,
    ...themeConfig.dark,
  },
};

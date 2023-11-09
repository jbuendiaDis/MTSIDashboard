import { createContext, Context } from 'react';
import { ThemeContext as ThemeContextType } from '../../models/theme';

export const ThemeContext: Context<ThemeContextType | any> =
  createContext(null);

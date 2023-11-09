import { useContext } from 'react';
import { ThemeContext as ThemeContextType } from '../../../models/theme';
import { ThemeContext } from '../ThemeContext';

export const useTheme = (): ThemeContextType => useContext(ThemeContext);

import { Box, IconButton, Tooltip } from '@mui/material';
import { useTranslation } from '../../hooks/useTranslations';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useTheme } from './hooks/useTheme';
import { setItem } from '../../utils/persistentStorage';

const Theme = () => {
  const { t } = useTranslation();
  const { theme, handleChangeTheme, availableSkins } = useTheme();
  const { dark, light } = availableSkins;

  const handleToggleTheme = () => {
    const selectedTheme = theme === light ? dark : light;

    handleChangeTheme(selectedTheme);
    setItem('theme', selectedTheme);
  };

  const tooltipText: string =
    theme === light ? t('theme.changeToDark') : t('theme.changeToLight');

  return (
    <Box>
      <Tooltip title={tooltipText}>
        <IconButton onClick={handleToggleTheme}>
          {theme === light ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export { Theme };

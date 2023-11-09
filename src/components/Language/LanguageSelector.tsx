import { useState } from 'react';
import { Box, Button, MenuItem } from '@mui/material';
import { Translate, ArrowDropDown } from '@mui/icons-material';
import { useTranslation } from '../../hooks/useTranslations';
import { languages } from '../../translations/i18n';
import { Popover } from '../Popover';

const LanguageSelector = () => {
  const { t, changeLanguage, language } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectLanguage = (language: string) => {
    changeLanguage(language);

    handleClose();
  };

  return (
    <Box>
      <Button
        color="inherit"
        size="large"
        aria-controls="locale-menu"
        aria-haspopup="true"
        endIcon={<ArrowDropDown />}
        startIcon={<Translate />}
        onClick={handleClick}
      >
        <div>{t(`language.${language}`)}</div>
      </Button>
      <Popover
        id="locale-menu"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box py={1}>
          {languages.map((language, index) => (
            <MenuItem
              key={`${index}-${language}`}
              onClick={() => handleSelectLanguage(language)}
            >
              {t(`language.${language}`)}
            </MenuItem>
          ))}
        </Box>
      </Popover>
    </Box>
  );
};

export { LanguageSelector };

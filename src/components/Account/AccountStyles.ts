import { Theme } from '@mui/material';
import { alpha } from '@mui/system';

interface AccountStylesProps {
  open: null;
}

export const AccountStyles = ({ open }: AccountStylesProps) => {
  const iconButton = {
    width: 40,
    height: 40,
    background: (theme: Theme) => alpha(theme.palette.grey[500], 0.08),
    ...(open
      ? {
          background: (theme: Theme) =>
            `linear-gradient(135deg, ${theme.palette.error.light} 0%, ${theme.palette.error.main} 100%)`,
        }
      : null),
  };

  const avatar = {
    width: 36,
    height: 36,
    border: (theme: Theme) => `solid 2px ${theme.palette.background.default}`,
  };

  return { iconButton, avatar };
};

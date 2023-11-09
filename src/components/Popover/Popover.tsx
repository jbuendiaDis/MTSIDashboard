import { ReactNode } from 'react';
import { Popover as MuiPopover } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Props {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  [x: string]: any;
}

const StyledPopover = styled(MuiPopover)(({ theme }) => ({
  '& .MuiPopover-paper': {
    margin: theme.spacing(1),
    overflow: 'visible',
    boxShadow: theme.shadows[4],
    borderRadius: theme.shape.borderRadius,

    '&::before': {
      content: "''",
      position: 'absolute',
      top: '-10px',
      left: '50%',
      transform: 'translateX(-50%)',
      borderStyle: 'solid',
      borderWidth: '0 10px 10px 10px',
      borderColor: `transparent transparent ${
        theme.palette.mode === 'dark' ? '#283543' : theme.palette.common.white
      }`,
    },
  },
}));

const Popover = ({ children, open, onClose, ...otherProps }: Props) => {
  return (
    <StyledPopover open={open} onClose={onClose} {...otherProps}>
      {children}
    </StyledPopover>
  );
};

export { Popover };

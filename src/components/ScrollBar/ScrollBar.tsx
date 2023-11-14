import { memo, forwardRef, ReactNode } from 'react';
import { Box, SxProps } from '@mui/material';
import { StyledRootScrollbar, StyledScrollbar } from './ScrollBarStyles';

// ----------------------------------------------------------------------

interface ScrollbarProps {
  children?: ReactNode;
  sx?: SxProps;
}

const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(function Scrollbar(
  { children, sx, ...other }: ScrollbarProps,
  ref
) {
  const userAgent =
    typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const mobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  if (mobile) {
    return (
      <Box ref={ref} sx={{ overflow: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar
        scrollableNodeProps={{
          ref,
        }}
        clickOnTrack={false}
        sx={sx}
        {...(other as any)}
      >
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
});

const MemoizedScrollbar = memo(Scrollbar);

export default MemoizedScrollbar;

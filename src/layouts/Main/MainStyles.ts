import { useResponsive } from '../../hooks/useResponsive';
import { HEADER, NAV } from '../../utils/configLayout';

const SPACING: number = 8;

export const MainStyles = () => {
  const lgUp = useResponsive('up', 'lg');

  const container = {
    flexGrow: 1,
    minHeight: 1,
    display: 'flex',
    flexDirection: 'column',
    py: `${HEADER.H_MOBILE + SPACING}px`,
    ...(lgUp && {
      px: 0,
      py: `${HEADER.H_DESKTOP + SPACING}px`,
      width: `calc(100% - ${NAV.WIDTH}px)`,
    }),
  };

  return { container };
};

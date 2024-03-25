interface HeaderProps {
  H_MOBILE: number;
  H_DESKTOP: number;
  H_DESKTOP_OFFSET: number;
}

interface NavProps {
  WIDTH: number;
}

export const HEADER: HeaderProps = {
  H_MOBILE: 64,
  H_DESKTOP: 80,
  H_DESKTOP_OFFSET: 80 - 16,
};

export const NAV: NavProps = {
  WIDTH: 280, //280
};

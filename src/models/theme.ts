export enum Skins {
  dark = 'dark',
  light = 'light',
}

export interface ThemeContext {
  theme: Skins;
  availableSkins: {
    [key in Skins]: Skins;
  };
  handleChangeTheme: (theme: Skins) => void;
}

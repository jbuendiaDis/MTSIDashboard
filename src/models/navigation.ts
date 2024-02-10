export interface SimpleRoute {
  layout: (props?: any) => JSX.Element;
  component: (props?: any) => JSX.Element;
  titleMessage: string;
}

export interface Route extends SimpleRoute {
  path: string;
  exact: boolean;
  private: boolean;
}

export type RouteGroup<T extends string> = Record<T, Route>;

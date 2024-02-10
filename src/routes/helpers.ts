import { RouteGroup } from '../models';

export const createRouteGroup = <T extends string>(routeGroup: RouteGroup<T>) =>
  routeGroup;

import { Route } from '../../domain/RouteType';

export interface IRouteRepository {
  findAll(): Promise<Route[]>;
  findById(routeId: string): Promise<Route | null>;
  findBaseline(): Promise<Route | null>;
  setBaseline(routeId: string): Promise<void>;
}
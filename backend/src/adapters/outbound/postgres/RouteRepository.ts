import pool from '../../../infrastructure/db/connection';
import { Route } from '../../../core/domain/RouteType';
import { IRouteRepository } from '../../../core/ports/outbound/IRouteRepository';

export class RouteRepository implements IRouteRepository {
  async findAll(): Promise<Route[]> {
    const result = await pool.query('SELECT * FROM routes ORDER BY id');
    return result.rows.map(this.mapRow);
  }

  async findById(routeId: string): Promise<Route | null> {
    const result = await pool.query('SELECT * FROM routes WHERE route_id = $1', [routeId]);
    return result.rows[0] ? this.mapRow(result.rows[0]) : null;
  }

  async findBaseline(): Promise<Route | null> {
    const result = await pool.query('SELECT * FROM routes WHERE is_baseline = true LIMIT 1');
    return result.rows[0] ? this.mapRow(result.rows[0]) : null;
  }

  async setBaseline(routeId: string): Promise<void> {
    await pool.query('UPDATE routes SET is_baseline = false');
    await pool.query('UPDATE routes SET is_baseline = true WHERE route_id = $1', [routeId]);
  }

  private mapRow(row: any): Route {
    return {
      id: row.id,
      routeId: row.route_id,
      vesselType: row.vessel_type,
      fuelType: row.fuel_type,
      year: row.year,
      ghgIntensity: parseFloat(row.ghg_intensity),
      fuelConsumption: parseFloat(row.fuel_consumption),
      distance: parseFloat(row.distance),
      totalEmissions: parseFloat(row.total_emissions),
      isBaseline: row.is_baseline,
    };
  }
}
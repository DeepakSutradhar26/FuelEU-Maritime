import pool from '../../../infrastructure/db/connection';
import { ComplianceBalance } from '../../../core/domain/ComplianceBalance';
import { IComplianceRepository } from '../../../core/ports/outbound/IComplianceRepository';

export class ComplianceRepository implements IComplianceRepository {
  async save(cb: ComplianceBalance): Promise<ComplianceBalance> {
    const result = await pool.query(
      `INSERT INTO ship_compliance (ship_id, year, cb_gco2eq)
       VALUES ($1, $2, $3)
       ON CONFLICT (ship_id, year) DO UPDATE SET cb_gco2eq = $3
       RETURNING *`,
      [cb.shipId, cb.year, cb.cbGco2eq]
    );
    return this.mapRow(result.rows[0]);
  }

  async findByShipAndYear(shipId: string, year: number): Promise<ComplianceBalance | null> {
    const result = await pool.query(
      'SELECT * FROM ship_compliance WHERE ship_id = $1 AND year = $2',
      [shipId, year]
    );
    return result.rows[0] ? this.mapRow(result.rows[0]) : null;
  }

  private mapRow(row: any): ComplianceBalance {
    return {
      shipId: row.ship_id,
      year: row.year,
      cbGco2eq: parseFloat(row.cb_gco2eq),
      surplus: parseFloat(row.cb_gco2eq) > 0,
    };
  }
}
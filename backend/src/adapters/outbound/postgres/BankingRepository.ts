import pool from '../../../infrastructure/db/connection';
import { BankEntry } from '../../../core/domain/BankEntry';
import { IBankingRepository } from '../../../core/ports/outbound/IBankingRepository';

export class BankingRepository implements IBankingRepository {
  async save(entry: BankEntry): Promise<BankEntry> {
    const result = await pool.query(
      `INSERT INTO bank_entries (ship_id, year, amount_gco2eq)
       VALUES ($1, $2, $3) RETURNING *`,
      [entry.shipId, entry.year, entry.amountGco2eq]
    );
    return this.mapRow(result.rows[0]);
  }

  async findByShipAndYear(shipId: string, year: number): Promise<BankEntry[]> {
    const result = await pool.query(
      'SELECT * FROM bank_entries WHERE ship_id = $1 AND year = $2',
      [shipId, year]
    );
    return result.rows.map(this.mapRow);
  }

  async getTotalBanked(shipId: string, year: number): Promise<number> {
    const result = await pool.query(
      'SELECT COALESCE(SUM(amount_gco2eq), 0) as total FROM bank_entries WHERE ship_id = $1 AND year = $2',
      [shipId, year]
    );
    return parseFloat(result.rows[0].total);
  }

  async deductBanked(shipId: string, year: number, amount: number): Promise<void> {
    await pool.query(
      `UPDATE bank_entries SET amount_gco2eq = amount_gco2eq - $3
       WHERE ship_id = $1 AND year = $2`,
      [shipId, year, amount]
    );
  }

  private mapRow(row: any): BankEntry {
    return {
      id: row.id,
      shipId: row.ship_id,
      year: row.year,
      amountGco2eq: parseFloat(row.amount_gco2eq),
      createdAt: row.created_at,
    };
  }
}
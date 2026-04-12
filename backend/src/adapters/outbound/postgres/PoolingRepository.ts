import pool from '../../../infrastructure/db/connection';
import { Pool, PoolMember } from '../../../core/domain/Pool';
import { IPoolingRepository } from '../../../core/ports/outbound/IPoolingRepository';

export class PoolingRepository implements IPoolingRepository {
  async createPool(year: number): Promise<Pool> {
    const result = await pool.query(
      'INSERT INTO pools (year) VALUES ($1) RETURNING *',
      [year]
    );
    return result.rows[0];
  }

  async addMembers(members: PoolMember[]): Promise<void> {
    for (const m of members) {
      await pool.query(
        'INSERT INTO pool_members (pool_id, ship_id, cb_before, cb_after) VALUES ($1, $2, $3, $4)',
        [m.poolId, m.shipId, m.cbBefore, m.cbAfter]
      );
    }
  }

  async findPoolById(poolId: number): Promise<Pool | null> {
    const result = await pool.query('SELECT * FROM pools WHERE id = $1', [poolId]);
    return result.rows[0] || null;
  }
}
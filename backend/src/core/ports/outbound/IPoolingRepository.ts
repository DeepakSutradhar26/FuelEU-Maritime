import { Pool, PoolMember } from '../../domain/Pool';

export interface IPoolingRepository {
  createPool(year: number): Promise<Pool>;
  addMembers(members: PoolMember[]): Promise<void>;
  findPoolById(poolId: number): Promise<Pool | null>;
}
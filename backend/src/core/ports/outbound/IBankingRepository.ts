import { BankEntry } from '../../domain/BankEntry';

export interface IBankingRepository {
  save(entry: BankEntry): Promise<BankEntry>;
  findByShipAndYear(shipId: string, year: number): Promise<BankEntry[]>;
  getTotalBanked(shipId: string, year: number): Promise<number>;
  deductBanked(shipId: string, year: number, amount: number): Promise<void>;
}
import { ComplianceBalance } from '../../domain/ComplianceBalance';

export interface IComplianceRepository {
  save(cb: ComplianceBalance): Promise<ComplianceBalance>;
  findByShipAndYear(shipId: string, year: number): Promise<ComplianceBalance | null>;
}
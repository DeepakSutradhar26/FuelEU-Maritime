import { applyBanked } from '../../core/application/usecases/ApplyBanked';

const mockComplianceRepo = {
  findByShipAndYear: jest.fn(),
  save: jest.fn(),
};

const mockBankingRepo = {
  save: jest.fn(),
  findByShipAndYear: jest.fn(),
  getTotalBanked: jest.fn(),
  deductBanked: jest.fn(),
};

describe('ApplyBanked', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should apply banked surplus to deficit', async () => {
    mockComplianceRepo.findByShipAndYear.mockResolvedValue({
      shipId: 'R003',
      year: 2024,
      cbGco2eq: -3000,
      surplus: false,
    });
    mockBankingRepo.getTotalBanked.mockResolvedValue(5000);
    mockBankingRepo.deductBanked.mockResolvedValue(undefined);
    mockComplianceRepo.save.mockResolvedValue({});

    const result = await applyBanked('R003', 2024, 3000, mockComplianceRepo as any, mockBankingRepo as any);
    expect(result.cbAfter).toBe(0);
    expect(result.applied).toBe(3000);
  });

  it('should throw error if over-applying banked amount', async () => {
    mockComplianceRepo.findByShipAndYear.mockResolvedValue({
      shipId: 'R003',
      year: 2024,
      cbGco2eq: -3000,
      surplus: false,
    });
    mockBankingRepo.getTotalBanked.mockResolvedValue(1000);

    await expect(
      applyBanked('R003', 2024, 5000, mockComplianceRepo as any, mockBankingRepo as any)
    ).rejects.toThrow('Amount exceeds available banked');
  });

  it('should throw error if no deficit exists', async () => {
    mockComplianceRepo.findByShipAndYear.mockResolvedValue({
      shipId: 'R002',
      year: 2024,
      cbGco2eq: 5000,
      surplus: true,
    });

    await expect(
      applyBanked('R002', 2024, 1000, mockComplianceRepo as any, mockBankingRepo as any)
    ).rejects.toThrow('No deficit to apply banked surplus to');
  });

  it('should throw error if CB not found', async () => {
    mockComplianceRepo.findByShipAndYear.mockResolvedValue(null);

    await expect(
      applyBanked('R999', 2024, 1000, mockComplianceRepo as any, mockBankingRepo as any)
    ).rejects.toThrow('Compliance balance not found');
  });
});
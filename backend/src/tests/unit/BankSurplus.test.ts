import { bankSurplus } from '../../core/application/usecases/BankSurplus';

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

describe('BankSurplus', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should bank surplus successfully', async () => {
    mockComplianceRepo.findByShipAndYear.mockResolvedValue({
      shipId: 'R002',
      year: 2024,
      cbGco2eq: 5000,
      surplus: true,
    });
    mockBankingRepo.save.mockResolvedValue({
      id: 1,
      shipId: 'R002',
      year: 2024,
      amountGco2eq: 5000,
      createdAt: new Date(),
    });

    const result = await bankSurplus('R002', 2024, mockComplianceRepo as any, mockBankingRepo as any);
    expect(result.amountGco2eq).toBe(5000);
  });

  it('should throw error if CB not found', async () => {
    mockComplianceRepo.findByShipAndYear.mockResolvedValue(null);
    await expect(
      bankSurplus('R999', 2024, mockComplianceRepo as any, mockBankingRepo as any)
    ).rejects.toThrow('Compliance balance not found');
  });

  it('should throw error if no surplus', async () => {
    mockComplianceRepo.findByShipAndYear.mockResolvedValue({
      shipId: 'R003',
      year: 2024,
      cbGco2eq: -5000,
      surplus: false,
    });
    await expect(
      bankSurplus('R003', 2024, mockComplianceRepo as any, mockBankingRepo as any)
    ).rejects.toThrow('No surplus to bank');
  });
});
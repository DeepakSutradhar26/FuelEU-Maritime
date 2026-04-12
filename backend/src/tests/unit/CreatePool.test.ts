import { createPool } from '../../core/application/usecases/CreatePool';

const mockComplianceRepo = {
  findByShipAndYear: jest.fn(),
  save: jest.fn(),
};

const mockPoolingRepo = {
  createPool: jest.fn(),
  addMembers: jest.fn(),
  findPoolById: jest.fn(),
};

describe('CreatePool', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should create pool successfully when sum CB >= 0', async () => {
    mockComplianceRepo.findByShipAndYear
      .mockResolvedValueOnce({ shipId: 'R002', year: 2024, cbGco2eq: 5000, surplus: true })
      .mockResolvedValueOnce({ shipId: 'R003', year: 2024, cbGco2eq: -3000, surplus: false });

    mockPoolingRepo.createPool.mockResolvedValue({ id: 1, year: 2024 });
    mockPoolingRepo.addMembers.mockResolvedValue(undefined);

    const result = await createPool(
      [{ shipId: 'R002', year: 2024 }, { shipId: 'R003', year: 2024 }],
      2024,
      mockComplianceRepo as any,
      mockPoolingRepo as any
    );

    expect(result.poolId).toBe(1);
    expect(result.members).toHaveLength(2);
  });

  it('should throw error when pool sum CB < 0', async () => {
    mockComplianceRepo.findByShipAndYear
      .mockResolvedValueOnce({ shipId: 'R003', year: 2024, cbGco2eq: -5000, surplus: false })
      .mockResolvedValueOnce({ shipId: 'R001', year: 2024, cbGco2eq: -3000, surplus: false });

    await expect(
      createPool(
        [{ shipId: 'R003', year: 2024 }, { shipId: 'R001', year: 2024 }],
        2024,
        mockComplianceRepo as any,
        mockPoolingRepo as any
      )
    ).rejects.toThrow('Pool sum must be >= 0');
  });

  it('should throw error if CB not found for a member', async () => {
    mockComplianceRepo.findByShipAndYear.mockResolvedValue(null);

    await expect(
      createPool(
        [{ shipId: 'R999', year: 2024 }],
        2024,
        mockComplianceRepo as any,
        mockPoolingRepo as any
      )
    ).rejects.toThrow('CB not found for ship R999');
  });
});
import apiClient from './apiClient';

export const bankSurplus = async (shipId: string, year: number) => {
  const res = await apiClient.post('/banking/bank', { shipId, year });
  return res.data;
};

export const applyBanked = async (shipId: string, year: number, amount: number) => {
  const res = await apiClient.post('/banking/apply', { shipId, year, amount });
  return res.data;
};

export const fetchBankingRecords = async (shipId: string, year: number) => {
  const res = await apiClient.get('/banking/records', { params: { shipId, year } });
  return res.data;
};
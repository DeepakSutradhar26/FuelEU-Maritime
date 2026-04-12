import apiClient from './apiClient';

export const createPool = async (members: { shipId: string; year: number }[], year: number) => {
  const res = await apiClient.post('/pools', { members, year });
  return res.data;
};
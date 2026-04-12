import apiClient from './apiClient';
import type { ComplianceBalance } from '../../../shared/types';

export const fetchCB = async (shipId: string, year: number): Promise<ComplianceBalance> => {
  const res = await apiClient.get('/compliance/cb', { params: { shipId, year } });
  return res.data;
};

export const fetchAdjustedCB = async (shipId: string, year: number) => {
  const res = await apiClient.get('/compliance/adjusted-cb', { params: { shipId, year } });
  return res.data;
};
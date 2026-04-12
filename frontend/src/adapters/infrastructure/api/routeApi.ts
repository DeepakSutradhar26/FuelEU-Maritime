import apiClient from './apiClient';
import type { Route, ComparisonResult } from '../../../shared/types';

export const fetchRoutes = async (): Promise<Route[]> => {
  const res = await apiClient.get('/routes');
  return res.data;
};

export const setBaseline = async (routeId: string): Promise<void> => {
  await apiClient.post(`/routes/${routeId}/baseline`);
};

export const fetchComparison = async (): Promise<ComparisonResult[]> => {
  const res = await apiClient.get('/routes/comparison');
  return res.data;
};
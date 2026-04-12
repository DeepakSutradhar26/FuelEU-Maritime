import { useState, useEffect } from 'react';
import { fetchRoutes } from '../../../infrastructure/api/routeApi';
import { fetchCB } from '../../../infrastructure/api/complianceApi';
import { createPool } from '../../../infrastructure/api/poolingApi';
import type { PoolMember, Route } from '../../../../shared/types';
import { PoolSumIndicator } from './PoolSumIndicator';
import { PoolMemberList } from './PoolMemberList';
import { Button } from '../shared/Button';
import { ErrorMessage } from '../shared/ErrorMessage';

interface MemberCB {
  shipId: string;
  year: number;
  cbGco2eq: number;
}

export const PoolingTab = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [memberCBs, setMemberCBs] = useState<MemberCB[]>([]);
  const [result, setResult] = useState<PoolMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRoutes().then(setRoutes).catch(() => setError('Failed to load routes'));
  }, []);

  const toggleSelect = async (routeId: string, year: number) => {
    if (selected.includes(routeId)) {
      setSelected((prev) => prev.filter((id) => id !== routeId));
      setMemberCBs((prev) => prev.filter((m) => m.shipId !== routeId));
    } else {
      try {
        const cb = await fetchCB(routeId, year);
        setSelected((prev) => [...prev, routeId]);
        setMemberCBs((prev) => [...prev, { shipId: routeId, year, cbGco2eq: cb.cbGco2eq }]);
      } catch {
        setError(`Failed to fetch CB for ${routeId}`);
      }
    }
  };

  const poolSum = memberCBs.reduce((sum, m) => sum + m.cbGco2eq, 0);
  const isValid = poolSum >= 0 && selected.length >= 2;

  const handleCreatePool = async () => {
    try {
      setLoading(true);
      setError('');
      const members = memberCBs.map((m) => ({ shipId: m.shipId, year: m.year }));
      const year = memberCBs[0]?.year || 2024;
      const data = await createPool(members, year);
      setResult(data.members);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create pool');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Pooling (Article 21)</h2>
      {error && <ErrorMessage message={error} />}

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-700 mb-4">Select Ships for Pool</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {routes.map((route) => (
            <button
              key={route.routeId}
              onClick={() => toggleSelect(route.routeId, route.year)}
              className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                selected.includes(route.routeId)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-400 text-gray-600'
              }`}
            >
              <div className="font-bold">{route.routeId}</div>
              <div className="text-xs">{route.vesselType}</div>
              <div className="text-xs">{route.fuelType} {route.year}</div>
            </button>
          ))}
        </div>
      </div>

      {memberCBs.length > 0 && (
        <PoolSumIndicator sum={poolSum} />
      )}

      <Button
        label="Create Pool"
        onClick={handleCreatePool}
        disabled={!isValid}
        variant="success"
        loading={loading}
      />

      {result.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700">Pool Result</h3>
          <PoolMemberList members={result} />
        </div>
      )}
    </div>
  );
};
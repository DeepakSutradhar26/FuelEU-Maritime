import { useState, useEffect } from 'react';
import type { ComparisonResult } from '../../../../shared/types';
import { fetchComparison } from '../../../infrastructure/api/routeApi';
import { CompareTable } from './CompareTable';
import { CompareChart } from './CompareChart';
import { ErrorMessage } from '../shared/ErrorMessage';
import { KpiCard } from '../shared/KpiCard';
import { TARGET_INTENSITY } from '../../../../shared/constants';

export const CompareTab = () => {
  const [data, setData] = useState<ComparisonResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchComparison();
        setData(result);
      } catch {
        setError('Failed to load comparison data. Make sure a baseline is set.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const compliantCount = data.filter((d) => d.compliant).length;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Compare Routes</h2>
      {error && <ErrorMessage message={error} />}

      <div className="grid grid-cols-3 gap-4">
        <KpiCard title="Target Intensity" value={`${TARGET_INTENSITY} gCO₂e/MJ`} color="blue" />
        <KpiCard title="Compliant Routes" value={compliantCount} color="green" />
        <KpiCard title="Non-Compliant" value={data.length - compliantCount} color="red" />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          <CompareChart data={data} />
          <CompareTable data={data} />
        </>
      )}
    </div>
  );
};
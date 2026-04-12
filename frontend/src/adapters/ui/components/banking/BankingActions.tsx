import { useState } from 'react';
import { Button } from '../shared/Button';
import { ErrorMessage } from '../shared/ErrorMessage';
import { fetchCB } from '../../../infrastructure/api/complianceApi';
import { bankSurplus, applyBanked } from '../../../infrastructure/api/bankingApi';

interface BankingActionsProps {
  onResult: (cbBefore: number, applied: number, cbAfter: number) => void;
}

export const BankingActions = ({ onResult }: BankingActionsProps) => {
  const [shipId, setShipId] = useState('R002');
  const [year, setYear] = useState('2024');
  const [amount, setAmount] = useState('');
  const [cb, setCb] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchCB = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchCB(shipId, parseInt(year));
      setCb(data.cbGco2eq);
    } catch {
      setError('Failed to fetch CB');
    } finally {
      setLoading(false);
    }
  };

  const handleBank = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await bankSurplus(shipId, parseInt(year));
      onResult(cb!, result.amountGco2eq, cb! - result.amountGco2eq);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to bank surplus');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await applyBanked(shipId, parseInt(year), parseFloat(amount));
      onResult(result.cbBefore, result.applied, result.cbAfter);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to apply banked');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
      <h3 className="font-semibold text-gray-700">Banking Actions (Article 20)</h3>
      {error && <ErrorMessage message={error} />}

      <div className="flex gap-4 flex-wrap">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Ship ID</label>
          <select
            value={shipId}
            onChange={(e) => setShipId(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {['R001','R002','R003','R004','R005'].map(id => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Year</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
        <div className="flex items-end">
          <Button label="Fetch CB" onClick={handleFetchCB} loading={loading} />
        </div>
      </div>

      {cb !== null && (
        <div className={`p-3 rounded-lg text-sm font-medium ${cb >= 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          Current CB: {cb.toLocaleString()} gCO₂e — {cb >= 0 ? 'Surplus ✅' : 'Deficit ❌'}
        </div>
      )}

      <div className="flex gap-4 flex-wrap items-end">
        <Button
          label="Bank Surplus"
          onClick={handleBank}
          disabled={cb === null || cb <= 0}
          variant="success"
          loading={loading}
        />
        <div>
          <label className="text-xs text-gray-500 block mb-1">Amount to Apply</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 100000"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-40"
          />
        </div>
        <Button
          label="Apply Banked"
          onClick={handleApply}
          disabled={cb === null || cb >= 0 || !amount}
          variant="danger"
          loading={loading}
        />
      </div>
    </div>
  );
};
import { useState } from 'react';
import { BankingKpis } from './BankingKpis';
import { BankingActions } from './BankingActions';

export const BankingTab = () => {
  const [kpis, setKpis] = useState<{ cbBefore: number | null; applied: number | null; cbAfter: number | null }>({
    cbBefore: null,
    applied: null,
    cbAfter: null,
  });

  const handleResult = (cbBefore: number, applied: number, cbAfter: number) => {
    setKpis({ cbBefore, applied, cbAfter });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Banking (Article 20)</h2>
      <BankingKpis {...kpis} />
      <BankingActions onResult={handleResult} />
    </div>
  );
};
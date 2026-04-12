import { KpiCard } from '../shared/KpiCard';

interface BankingKpisProps {
  cbBefore: number | null;
  applied: number | null;
  cbAfter: number | null;
}

export const BankingKpis = ({ cbBefore, applied, cbAfter }: BankingKpisProps) => (
  <div className="grid grid-cols-3 gap-4">
    <KpiCard
      title="CB Before"
      value={cbBefore !== null ? cbBefore.toLocaleString() : '—'}
      subtitle="gCO₂e"
      color={cbBefore !== null && cbBefore >= 0 ? 'green' : 'red'}
    />
    <KpiCard
      title="Applied"
      value={applied !== null ? applied.toLocaleString() : '—'}
      subtitle="gCO₂e banked/applied"
      color="blue"
    />
    <KpiCard
      title="CB After"
      value={cbAfter !== null ? cbAfter.toLocaleString() : '—'}
      subtitle="gCO₂e"
      color={cbAfter !== null && cbAfter >= 0 ? 'green' : 'red'}
    />
  </div>
);
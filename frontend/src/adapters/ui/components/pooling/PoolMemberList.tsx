import type { PoolMember } from '../../../../shared/types';

interface PoolMemberListProps {
  members: PoolMember[];
}

export const PoolMemberList = ({ members }: PoolMemberListProps) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200">
    <table className="w-full text-sm">
      <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
        <tr>
          {['Ship ID', 'CB Before', 'CB After', 'Change'].map(h => (
            <th key={h} className="px-4 py-3 text-left">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {members.map((m) => (
          <tr key={m.shipId} className="hover:bg-gray-50">
            <td className="px-4 py-3 font-medium">{m.shipId}</td>
            <td className={`px-4 py-3 ${m.cbBefore >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {m.cbBefore.toLocaleString()}
            </td>
            <td className={`px-4 py-3 ${m.cbAfter >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {m.cbAfter.toLocaleString()}
            </td>
            <td className="px-4 py-3">
              {m.cbAfter - m.cbBefore >= 0
                ? <span className="text-green-600">+{(m.cbAfter - m.cbBefore).toLocaleString()}</span>
                : <span className="text-red-600">{(m.cbAfter - m.cbBefore).toLocaleString()}</span>
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
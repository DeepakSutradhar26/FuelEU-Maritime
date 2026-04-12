export type PoolMemberState = {
  shipId: string;
  cbBefore: number;
};

export type PoolMemberAfter = PoolMemberState & { cbAfter: number };

export type CreatePoolResult =
  | { ok: true; members: PoolMemberAfter[]; poolSumAfter: number }
  | { ok: false; error: string };

/**
 * Greedy redistribution: sort by CB descending, transfer surplus to deficits.
 * Validates sum(cb_before) >= 0 and post-conditions for Article 21-style rules.
 */
export function allocatePool(members: PoolMemberState[]): CreatePoolResult {
  if (members.length === 0) {
    return { ok: false, error: 'Pool must have at least one member' };
  }

  const sumBefore = members.reduce((s, m) => s + m.cbBefore, 0);
  if (sumBefore < 0) {
    return { ok: false, error: 'Sum of adjusted compliance balances must be non-negative' };
  }

  const working = members.map((m) => ({ shipId: m.shipId, cb: m.cbBefore }));
  const sortedIdx = working
    .map((_, i) => i)
    .sort((a, b) => working[b]!.cb - working[a]!.cb);

  let lo = 0;
  let hi = sortedIdx.length - 1;

  while (lo < hi) {
    const iHi = sortedIdx[lo]!;
    const iLo = sortedIdx[hi]!;
    if (working[iHi]!.cb <= 0) {
      lo++;
      continue;
    }
    if (working[iLo]!.cb >= 0) {
      hi--;
      continue;
    }

    const transfer = Math.min(working[iHi]!.cb, -working[iLo]!.cb);
    working[iHi]!.cb -= transfer;
    working[iLo]!.cb += transfer;

    if (working[iHi]!.cb === 0) lo++;
    if (working[iLo]!.cb === 0) hi--;
  }

  const after: PoolMemberAfter[] = members.map((m, i) => ({
    shipId: m.shipId,
    cbBefore: m.cbBefore,
    cbAfter: working[i]!.cb,
  }));

  const poolSumAfter = after.reduce((s, m) => s + m.cbAfter, 0);
  if (Math.abs(poolSumAfter - sumBefore) > 1e-6) {
    return { ok: false, error: 'Internal pool allocation error: sum mismatch' };
  }

  for (const m of after) {
    if (m.cbBefore < 0 && m.cbAfter < m.cbBefore) {
      return { ok: false, error: 'Deficit ship would exit worse than before' };
    }
    if (m.cbBefore > 0 && m.cbAfter < 0) {
      return { ok: false, error: 'Surplus ship would exit negative' };
    }
  }

  return { ok: true, members: after, poolSumAfter };
}

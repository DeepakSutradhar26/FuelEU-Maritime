export type ApplyBankedInput = {
  availableBankedGco2eq: number;
  recipientCbBefore: number;
  amountRequested: number;
};

export type ApplyBankedResult =
  | {
      ok: true;
      applied: number;
      cbAfter: number;
    }
  | { ok: false; error: string };

/**
 * Applies banked surplus to a deficit ship. Amount cannot exceed available bank or what's needed to reach cb=0.
 */
export function applyBanked(input: ApplyBankedInput): ApplyBankedResult {
  if (input.amountRequested <= 0) {
    return { ok: false, error: 'Amount must be positive' };
  }
  if (input.availableBankedGco2eq < input.amountRequested) {
    return { ok: false, error: 'Amount exceeds available banked surplus' };
  }
  if (input.recipientCbBefore >= 0) {
    return { ok: false, error: 'Recipient has no deficit to cover' };
  }

  const deficit = -input.recipientCbBefore;
  const applied = Math.min(input.amountRequested, deficit, input.availableBankedGco2eq);
  if (applied <= 0) {
    return { ok: false, error: 'Nothing to apply' };
  }

  const cbAfter = input.recipientCbBefore + applied;
  return { ok: true, applied, cbAfter };
}

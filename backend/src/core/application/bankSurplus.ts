export type BankSurplusInput = {
  currentCbGco2eq: number;
};

export type BankSurplusResult =
  | { ok: true; bankedAmount: number; cbAfter: number }
  | { ok: false; error: string };

export function bankSurplus(input: BankSurplusInput): BankSurplusResult {
  if (input.currentCbGco2eq <= 0) {
    return { ok: false, error: 'Compliance balance must be positive to bank surplus' };
  }
  const bankedAmount = input.currentCbGco2eq;
  return { ok: true, bankedAmount, cbAfter: 0 };
}

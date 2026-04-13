import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { PoolSumIndicator } from '../../adapters/ui/components/pooling/PoolSumIndicator';

describe('PoolSumIndicator', () => {
  it('shows valid pool when sum is positive', () => {
    render(React.createElement(PoolSumIndicator, { sum: 500000 }));
    expect(screen.getByText(/Valid pool/i)).toBeInTheDocument();
  });

  it('shows invalid pool when sum is negative', () => {
    render(React.createElement(PoolSumIndicator, { sum: -500000 }));
    expect(screen.getByText(/Invalid pool/i)).toBeInTheDocument();
  });
});
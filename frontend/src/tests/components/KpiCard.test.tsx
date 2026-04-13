import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { KpiCard } from '../../adapters/ui/components/shared/KpiCard';

describe('KpiCard', () => {
  it('renders title and value', () => {
    render(React.createElement(KpiCard, { title: 'CB Before', value: 263082240 }));
    expect(screen.getByText('CB Before')).toBeInTheDocument();
    expect(screen.getByText(263082240)).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(React.createElement(KpiCard, { title: 'CB Before', value: 100, subtitle: 'gCO₂e' }));
    expect(screen.getByText('gCO₂e')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(React.createElement(KpiCard, { title: 'Test', value: 1, icon: '📈' }));
    expect(screen.getByText('📈')).toBeInTheDocument();
  });
});
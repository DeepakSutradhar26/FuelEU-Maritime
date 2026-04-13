import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { Badge } from '../../adapters/ui/components/shared/Badge';

describe('Badge', () => {
  it('renders compliant badge when value is true', () => {
    render(React.createElement(Badge, { value: true }));
    expect(screen.getByText('✅ Compliant')).toBeInTheDocument();
  });

  it('renders non-compliant badge when value is false', () => {
    render(React.createElement(Badge, { value: false }));
    expect(screen.getByText('❌ Non-Compliant')).toBeInTheDocument();
  });
});
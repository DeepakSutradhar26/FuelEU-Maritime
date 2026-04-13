import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { ErrorMessage } from '../../adapters/ui/components/shared/ErrorMessage';

describe('ErrorMessage', () => {
  it('renders error message text', () => {
    render(React.createElement(ErrorMessage, { message: 'Failed to load routes' }));
    expect(screen.getByText(/Failed to load routes/i)).toBeInTheDocument();
  });
});
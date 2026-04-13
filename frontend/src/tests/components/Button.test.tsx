import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { Button } from '../../adapters/ui/components/shared/Button';

describe('Button', () => {
  it('renders label', () => {
    render(React.createElement(Button, { label: 'Set Baseline', onClick: () => {} }));
    expect(screen.getByText('Set Baseline')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(React.createElement(Button, { label: 'Click Me', onClick: handleClick }));
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(React.createElement(Button, { label: 'Disabled', onClick: handleClick, disabled: true }));
    fireEvent.click(screen.getByText('Disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows loading text when loading is true', () => {
    render(React.createElement(Button, { label: 'Submit', onClick: () => {}, loading: true }));
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
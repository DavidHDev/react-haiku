import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { RenderAfter } from '../RenderAfter';

describe('RederAfter', () => {
  const text = 'Delayed Content';

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders the RenderAfter component correctly after delay', async () => {
    const { asFragment } = render(<RenderAfter>{text}</RenderAfter>);
    act(() => vi.advanceTimersByTime(1000));
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('does not render children initially', () => {
    render(<RenderAfter>{text}</RenderAfter>);
    expect(screen.queryByText(text)).not.toBeInTheDocument();
  });

  it('renders children with different delay', async () => {
    const delay = 2000;
    render(<RenderAfter delay={delay}>{text}</RenderAfter>);
    expect(screen.queryByText(text)).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(delay));
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});

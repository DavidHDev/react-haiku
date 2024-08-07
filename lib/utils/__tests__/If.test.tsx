import { If } from '../If';
import { describe, expect, it } from 'vitest';
import { takeSnapshot } from 'lib/helpers/testHelper';
import { render, screen } from '@testing-library/react';

describe('If', () => {
  it('renders the If component', () => {
    takeSnapshot(<If isTrue>Hello</If>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should not render anything if isTrue is false', () => {
    render(<If isTrue={false}>Hello</If>);
    expect(screen.queryByText('Hello')).toBeNull();
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
  });
});

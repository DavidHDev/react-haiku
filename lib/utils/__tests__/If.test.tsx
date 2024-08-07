import { If } from '../If';
import { describe, expect, it } from 'vitest';
import { takeSnapshot } from 'lib/helpers/testHelper';
import { render, screen } from '@testing-library/react';

describe('If', () => {
  const text = 'Hello world!';

  it('renders the If component', () => {
    takeSnapshot(<If isTrue>{text}</If>);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('should not render anything if isTrue is false', () => {
    render(<If isTrue={false}>{text}</If>);
    expect(screen.queryByText(text)).toBeNull();
    expect(screen.queryByText(text)).not.toBeInTheDocument();
  });
});

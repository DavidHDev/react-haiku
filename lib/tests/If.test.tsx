import { render, screen } from '@testing-library/react';
import { If } from '../utils/If';

describe('If', () => {
  const text = 'If Block';

  it('renders the If component', () => {
    const { asFragment } = render(<If isTrue>{text}</If>);
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('should not render anything if isTrue is false', () => {
    render(<If isTrue={false}>{text}</If>);
    expect(screen.queryByText(text)).toBeNull();
    expect(screen.queryByText(text)).not.toBeInTheDocument();
  });
});

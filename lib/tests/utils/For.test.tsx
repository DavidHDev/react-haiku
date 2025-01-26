import { For } from '../../utils/For';
import { render, screen } from '@testing-library/react';

describe('For', () => {
  const testArray = ['foo', 'bar', 'baz'];

  it('renders the For component', () => {
    const { asFragment } = render(
      <For
        each={testArray}
        render={(item, index) => <span key={index}>{`${index}: ${item}`}</span>}
      />,
    );
    expect(asFragment()).toMatchSnapshot();

    testArray.forEach((item, index) => {
      expect(screen.getByText(`${index}: ${item}`)).toBeInTheDocument();
    });
    expect(document.body.firstChild!.childNodes).toHaveLength(testArray.length);
  });
});

import { describe, expect, it } from 'vitest';
import { takeSnapshot } from 'lib/helpers/testHelper';
import { For } from '../For';
import { render, screen } from '@testing-library/react';

describe('For', () => {
  const testArray = ['foo', 'bar', 'baz'];

  it('renders the For component', () => {
    takeSnapshot(
      <For
        each={testArray}
        render={(item, index) => <span key={index}>{`${index}: ${item}`}</span>}
      />,
    );

    testArray.forEach((item, index) => {
      expect(screen.getByText(`${index}: ${item}`)).toBeInTheDocument();
    });
    expect(document.body.firstChild!.childNodes).toHaveLength(testArray.length);
  });

  it('should not render anything if we pass empty array as prop', () => {
    render(
      <For
        each={[]}
        render={(item, index) => <span key={index}>{item}</span>}
      />,
    );
    expect(document.body.firstChild!.childNodes).toHaveLength(0);
  });
});

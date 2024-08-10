import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { takeSnapshot } from 'lib/helpers/testHelper';
import { Show } from '../Show';

describe('Show', () => {
  const whenText = 'When Component';

  it('renders the Show component', () => {
    takeSnapshot(
      <Show>
        <Show.When isTrue>{whenText}</Show.When>
      </Show>,
    );
    expect(screen.getByText(whenText)).toBeInTheDocument();
  });

  it('renders the Else component when isTrue is false', () => {
    const elseText = 'Else Component';
    render(
      <Show>
        <Show.When isTrue={false}>{whenText}</Show.When>
        <Show.Else>{elseText}</Show.Else>
      </Show>,
    );
    expect(screen.queryByText(whenText)).not.toBeInTheDocument();
    expect(screen.getByText(elseText)).toBeInTheDocument();
  });

  it('ignores non-element children', () => {
    const inValidText = 'This is not a React element';
    const { queryByText } = render(
      <Show>
        {inValidText}
        <Show.When isTrue>{whenText}</Show.When>
      </Show>,
    );

    expect(queryByText(whenText)).toBeInTheDocument();
    expect(queryByText(inValidText)).toBeNull();
  });

  it('render render function when pass', () => {
    const renderText = 'Render text';
    const renderFuntion = () => renderText;
    const { queryByText } = render(
      <Show>
        <Show.When isTrue={false}>{whenText}</Show.When>
        <Show.Else render={renderFuntion} />
      </Show>,
    );

    expect(queryByText(renderText)).toBeInTheDocument();
  });
});

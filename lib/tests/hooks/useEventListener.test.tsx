import { renderHook, act } from '@testing-library/react';
import { useEventListener } from '../../hooks/useEventListener';

describe('useEventListener Hook', () => {
  test('adds and triggers event listener correctly', () => {
    const handler = jest.fn();

    const { unmount } = renderHook(() => useEventListener('click', handler));

    act(() => {
      window.dispatchEvent(new MouseEvent('click'));
    });

    expect(handler).toHaveBeenCalledTimes(1);

    unmount();

    act(() => {
      window.dispatchEvent(new MouseEvent('click'));
    });

    expect(handler).toHaveBeenCalledTimes(1); // Should not trigger after unmount
  });
});

import { renderHook, act } from '@testing-library/react';
import { useScrollDevice } from '../../hooks/useScrollDevice';

describe('useScrollDevice Hook (with debounce)', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Mock timers for debounce testing
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('returns null initially', () => {
    const { result } = renderHook(() => useScrollDevice());
    expect(result.current).toBeNull();
  });

  test('detects trackpad scrolling after debounce', () => {
    const { result } = renderHook(() => useScrollDevice());

    act(() => {
      window.dispatchEvent(new WheelEvent('wheel', { deltaY: 10, deltaX: 5 }));
      jest.advanceTimersByTime(200); // Simulate debounce delay
    });

    expect(result.current).toBe('trackpad');
  });

  test('detects mouse wheel scrolling after debounce', () => {
    const { result } = renderHook(() => useScrollDevice());

    act(() => {
      window.dispatchEvent(new WheelEvent('wheel', { deltaY: 100, deltaX: 0 }));
      jest.advanceTimersByTime(200); // Simulate debounce delay
    });

    expect(result.current).toBe('mouse');
  });

  test('does not update device type immediately during rapid scrolling', () => {
    const { result } = renderHook(() => useScrollDevice());

    act(() => {
      window.dispatchEvent(new WheelEvent('wheel', { deltaY: 10, deltaX: 5 }));
      window.dispatchEvent(new WheelEvent('wheel', { deltaY: 120, deltaX: 0 }));
    });

    expect(result.current).toBeNull(); // Should not update immediately

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe('mouse'); // Last event should be recognized
  });

  test('only updates to final value after user stops scrolling', () => {
    const { result } = renderHook(() => useScrollDevice());

    act(() => {
      window.dispatchEvent(new WheelEvent('wheel', { deltaY: 15, deltaX: 10 }));
      jest.advanceTimersByTime(100); // Partial debounce period

      window.dispatchEvent(new WheelEvent('wheel', { deltaY: 100, deltaX: 0 }));
      jest.advanceTimersByTime(200); // Full debounce time
    });

    expect(result.current).toBe('mouse'); // Final detected scroll type
  });

  test('cleans up event listener on unmount', () => {
    const { unmount } = renderHook(() => useScrollDevice());
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'wheel',
      expect.any(Function),
    );
  });
});

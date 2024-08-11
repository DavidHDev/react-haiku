import { act, fireEvent, renderHook } from '@testing-library/react';
import { useClickOutside } from '../useClickOutside';
import { describe, expect, it, vi } from 'vitest';

describe('useClickOutside', () => {
  it('should call the handler when a clicking outside the element (single ref)', () => {
    const containerRef = { current: document.createElement('div') };
    const handler = vi.fn();

    renderHook(() => {
      useClickOutside(containerRef, handler);
    });

    expect(handler).toHaveBeenCalledTimes(0);

    act(() => {
      fireEvent.mouseDown(document);
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should call the handler when a clicking outside the element (multiple refs)', () => {
    const containerRef1 = { current: document.createElement('div') };
    const containerRef2 = { current: document.createElement('div') };
    const handler = vi.fn();

    renderHook(() => {
      useClickOutside([containerRef1, containerRef2], handler);
    });

    expect(handler).toHaveBeenCalledTimes(0);

    act(() => {
      fireEvent.mouseDown(document);
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should call the handler when a clicking outside the element (multiple refs with a null)', () => {
    const containerRef1 = { current: document.createElement('div') };
    const containerRef2 = { current: null };
    const handler = vi.fn();

    renderHook(() => {
      useClickOutside([containerRef1, containerRef2], handler);
    });

    expect(handler).toHaveBeenCalledTimes(0);

    act(() => {
      fireEvent.mouseDown(document);
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should NOT call the handler when a clicking inside the element', () => {
    const containerRef = { current: document.createElement('div') };
    const handler = vi.fn();

    renderHook(() => {
      useClickOutside([containerRef], handler);
    });

    act(() => {
      fireEvent.mouseDown(containerRef.current);
    });

    expect(handler).toHaveBeenCalledTimes(0);
  });

  it('should NOT call the handler when clicking a non-connected element', () => {
    const containerRef = { current: document.createElement('div') };
    const handler = vi.fn();

    renderHook(() => {
      useClickOutside([containerRef], handler);
    });

    act(() => {
      const element = document.createElement('div');
      document.body.appendChild(element);
      document.body.removeChild(element);
      fireEvent.mouseDown(element);
    });

    expect(handler).toHaveBeenCalledTimes(0);
  });
});

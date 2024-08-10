import { renderHook, act } from '@testing-library/react';
import {
  deleteCookie,
  parseToCookieType,
  parseToDataType,
  setCookie,
} from 'lib/helpers/cookie';
import { describe, afterEach, it, expect } from 'vitest';
import { useCookie } from '../useCookie';

describe('useCookie', () => {
  const key = 'testCookie';
  const initialValue = 'initialValue';

  afterEach(() => {
    deleteCookie(key);
  });

  it('should set the initial cookie value if not set', () => {
    renderHook(() => useCookie(key, initialValue));

    expect(document.cookie).toEqual(
      `${key}=${parseToDataType(parseToCookieType(initialValue))}`,
    );
  });

  it('should return the initial value from the cookie', () => {
    setCookie(key, initialValue, 365);

    const { result } = renderHook(() => useCookie(key, initialValue));
    expect(result.current[0]).toBe(initialValue);
  });

  it('should update the cookie value when setValue is called', () => {
    const newValue = 'new value';
    const { result } = renderHook(() => useCookie(key, initialValue));

    act(() => {
      result.current[1](newValue);
    });

    expect(document.cookie).toEqual(
      `${key}=${parseToDataType(parseToCookieType(newValue))}`,
    );
    expect(result.current[0]).toBe(newValue);
  });

  it('should delete the cookie when deleteValue is called', () => {
    setCookie(key, initialValue, 365);

    const { result } = renderHook(() => useCookie(key, initialValue));

    act(() => {
      result.current[2]();
    });

    expect(document.cookie).not.toEqual(key);
  });
});

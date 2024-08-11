import { describe, expect, it, vi } from 'vitest';
import {
  deleteCookie,
  getCookie,
  getCookies,
  parseToCookieType,
  parseToDataType,
  setCookie,
} from '../cookie';

describe('cookies', () => {
  const testString = 'testString';
  const testObject = { key: 'value' };
  const testCookieName = 'testCookie';
  const testCookieValue = 'testValue';
  const testCookieString = `${testCookieName}=${testCookieValue};`;
  const nonExistentCookie = 'nonExistentCookie';
  const cookieList = 'cookie1=123; cookie2="value"; cookie3=456';

  describe('parseToDataType', () => {
    it('should return undefined when input is "undefined" or undefined', () => {
      expect(parseToDataType('undefined')).toBeUndefined();
      expect(parseToDataType(undefined)).toBeUndefined();
    });

    it('should parse a valid JSON string', () => {
      const result = parseToDataType<number>('123');
      expect(result).toEqual(123);
    });

    it('should retry parsing with modified string if first attempt fails', () => {
      const result = parseToDataType<string>('someValue');
      expect(result).toEqual('someValue');
    });
  });

  describe('parseToCookieType', () => {
    it('should return the input if it is a string', () => {
      const result = parseToCookieType(testString);
      expect(result).toEqual(testString);
    });

    it('should return JSON stringified value if the input is not a string', () => {
      const result = parseToCookieType(testObject);
      expect(result).toEqual(JSON.stringify(testObject));
    });
  });

  describe('getCookie', () => {
    it('should return undefined if the cookie is not found', () => {
      vi.stubGlobal('document', { cookie: '' });
      const result = getCookie(nonExistentCookie);
      expect(result).toBeUndefined();
    });

    it('should return the parsed cookie value if the cookie is found', () => {
      vi.stubGlobal('document', { cookie: `testCookie=123;` });
      const result = getCookie<number>(testCookieName);
      expect(result).toEqual(123);
    });
  });

  describe('getCookies', () => {
    it('should return an object with cookie values for given cookie names', () => {
      vi.stubGlobal('document', { cookie: cookieList });

      const result = getCookies<number | string>(['cookie1', 'cookie2']);

      expect(result).toEqual({
        cookie1: 123,
        cookie2: 'value',
      });
    });

    it('should return an object with all cookie values if no names are provided', () => {
      vi.stubGlobal('document', { cookie: cookieList });

      const result = getCookies();

      expect(result).toEqual({
        cookie1: 123,
        cookie2: 'value',
        cookie3: 456,
      });
    });
  });

  describe('setCookie', () => {
    it('should set a cookie with the correct value and expiration date', () => {
      vi.stubGlobal('document', { cookie: '' });
      setCookie(testCookieName, testCookieValue, 1);
      expect(document.cookie).toContain(testCookieString);
    });
  });

  describe('deleteCookie', () => {
    it('should delete the specified cookie', () => {
      vi.stubGlobal('document', { cookie: testCookieString });

      deleteCookie(testCookieName);

      expect(document.cookie).not.toEqual(testCookieString);
    });
  });
});

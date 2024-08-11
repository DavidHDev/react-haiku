import { useState } from 'react';

import { useCookieListener } from './useCookieListener';
import { useSingleEffect } from './useSingleEffect';

import {
  parseToCookieType,
  parseToDataType,
  getCookie,
  setCookie,
  deleteCookie,
} from '../helpers/cookie';

export const useCookie = <T>(
  key: string,
  initialValue: T,
  expireDays = 365,
) => {
  const initialCookieValue = getCookie<T>(key);

  const parsedInitialValue =
    initialCookieValue !== undefined
      ? initialCookieValue
      : parseToDataType<T>(parseToCookieType(initialValue));

  const [cookieValue, setCookieValue] = useState<T | undefined>(
    parsedInitialValue,
  );

  useSingleEffect(() => {
    if (initialCookieValue === undefined) {
      setCookie(key, initialValue, expireDays);
    }
  });

  useCookieListener(
    (value: T) => {
      setCookieValue(value);
    },
    [key],
  );

  const setValue = (value: T) => {
    setCookieValue(value);
    setCookie(key, value, expireDays);
  };

  const deleteValue = () => {
    deleteCookie(key);
  };

  return [cookieValue, setValue, deleteValue] as const;
};

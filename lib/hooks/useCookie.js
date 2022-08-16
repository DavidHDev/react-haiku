import { useState } from 'react';

import { useCookieListener } from './useCookieListener';
import { useSingleEffect } from './useSingleEffect';

import { parseToCookieType, parseToDataType, getCookie, setCookie, deleteCookie } from '../helpers/cookie';

export const useCookie = (key, initialValue, expireDays = 365) => {
  const [cookieValue, setCookieValue] = useState(getCookie(key) ?? parseToDataType(parseToCookieType(initialValue)));

  useSingleEffect(() => {
    if (typeof getCookie(key) === 'undefined') setCookie(key, initialValue, expireDays);
  });

  useCookieListener(
    (value) => {
      setCookieValue(value);
    },
    [key],
  );

  const setValue = (value) => {
    setCookieValue(value);
    setCookie(key, value, expireDays);
  };

  const deleteValue = () => {
    deleteCookie(key);
  };

  return [cookieValue, setValue, deleteValue];
};

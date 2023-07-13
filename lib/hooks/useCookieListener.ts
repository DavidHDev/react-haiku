import { useRef, useEffect } from 'react';

import { parseToCookieType, getCookies } from '../helpers/cookie';

export const useCookieListener = (effect, cookies) => {
  const cookieValues = useRef(getCookies(cookies));

  useEffect(() => {
    const cookieOnChange = () => {
      const currentCookiesValues = getCookies(cookies);

      Object.entries(cookieValues.current).forEach(([cookieKey, cookieValue]) => {
        const currentCookie = currentCookiesValues[cookieKey];

        if (parseToCookieType(currentCookie) !== parseToCookieType(cookieValue)) {
          cookieValues.current = { ...cookieValues.current, [cookieKey]: currentCookie };
          effect(currentCookie, cookieKey);
        }
      });
    };

    const cookieInterval = setInterval(cookieOnChange, 1000);

    return () => {
      clearInterval(cookieInterval);
    };
  }, [effect, cookies]);
};

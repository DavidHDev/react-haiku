export const parseToDataType = (value: string | undefined, isItRetry = false): any => {
  try {
    return value === 'undefined' || value === undefined ? undefined : JSON.parse(value);
  } catch (e) {
    if (!isItRetry) return parseToDataType(`"${value?.replaceAll?.('"', '')}"`, true);
    return undefined;
  }
};

export const parseToCookieType = <T>(value: T) => {
  if(typeof value === 'string') return value;

  return JSON.stringify(value);
}

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;

  const [_, cookie] = value.split(`; ${name}=`);

  return cookie ? parseToDataType(cookie.split(';')[0]) : cookie;
};

export const getCookies = (cookies: string[] = []) => {
  if (cookies.length) return cookies.reduce((result, cookie) => ({ ...result, [cookie]: getCookie(cookie) }), {});

  return Object.fromEntries(document.cookie.split('; ').map((c) => {
    const [key, value] = c.split('=');
    return [key, parseToDataType(value)]
  }));
};

export const setCookie = <T>(name: string, value: T, expireDays: number) => {
  const date = new Date();
  const millisecondsInADay = 24 * 60 * 60 * 1000;
  const expireDate = date.getTime() + expireDays * millisecondsInADay;

  date.setTime(expireDate);

  const expires = `expires=${date.toUTCString()}`;

  document.cookie = `${name}=${parseToCookieType(value)}; ${expires}; path=/;`;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

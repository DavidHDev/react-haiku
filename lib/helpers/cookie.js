export const parseToDataType = (value, isItRetry = false) => {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch (e) {
    if (!isItRetry) return parseToDataType(`"${value?.replaceAll?.('"', '')}"`, true);
    return undefined;
  }
};

export const parseToCookieType = (value) => JSON.stringify(value);

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;

  const [, cookie] = value.split(`; ${name}=`);

  return cookie ? parseToDataType(cookie.split(';')[0]) : cookie;
};

export const getCookies = (cookies = []) => {
  if (cookies.length) return cookies.reduce((result, cookie) => ({ ...result, [cookie]: getCookie(cookie) }), {});

  return Object.fromEntries(document.cookie.split('; ').map((c) => {
    const [key, value] = c.split('=');
    return [key, parseToDataType(value)]
  }));
};

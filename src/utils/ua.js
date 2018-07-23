export const isWx = () => {
  const ua = window.navigator.userAgent;
  return /micromessenger/i.test(ua);
};

export const isIOS = () => {
  const ua = window.navigator.userAgent;
  return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
};

export const isAndroid = () => {
  const ua = window.navigator.userAgent;
  return ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
};

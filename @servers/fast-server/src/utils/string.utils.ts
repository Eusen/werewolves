export function convertHumpToKebab(hump: string) {
  const humpArr = hump.replace(/Model/g, '').split('');
  return humpArr.reduce((p, c) => {
    const asc2 = c.charCodeAt(0);
    if (asc2 >= 65 && asc2 <= 90) c = `_${c.toLowerCase()}`;
    return p + c;
  }, '');
}

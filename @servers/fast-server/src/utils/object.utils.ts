export function convertEnumToKeys(_enum) {
  return Object.keys(_enum).reduce((p, c) => {
    const num = parseInt(c);
    if (!isNaN(num)) p.push(num);
    return p;
  }, []);
}

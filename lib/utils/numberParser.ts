export default function numberParser(x: number | string) {
  if (!isNumber(x)) x = parseFloat(x);
  if (x < 1)
    return x.toLocaleString(undefined, {
      minimumSignificantDigits: 4,
      maximumSignificantDigits: 4,
    });
  else
    return x.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
}

function isNumber(x: number | string) {
  return typeof x === 'number';
}

export default function numberParser(x: number) {
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

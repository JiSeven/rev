const formatter = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
  trailingZeroDisplay: "stripIfInteger",
});

export function formatCurrency(value: number) {
  return formatter.format(value);
}

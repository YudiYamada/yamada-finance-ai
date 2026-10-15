export function formatCurrencyUSD(value: string | number): string {
  const stringValue = typeof value === "number" ? value.toString() : value;
  const numericValue = stringValue.replace(/\D/g, "");

  if (!numericValue) return "";

  const numberValue = Number(numericValue) / 100;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numberValue);
}

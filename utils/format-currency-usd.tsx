export function formatCurrencyUSD(value: string): string {
  const numericValue = value.replace(/\D/g, "");
  
  if (!numericValue) return "";

  const numberValue = Number(numericValue) / 100;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numberValue);
}

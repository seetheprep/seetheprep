export function cn(...values: (string | false | null | undefined)[]) {
  return values.filter(Boolean).join(" ");
}
export const formatPrice = (value: number) => `£${value.toFixed(2)}`;

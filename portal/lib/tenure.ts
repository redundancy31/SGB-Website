export function calculateTenure(startDate: string, asOf = new Date()): string {
  const start = new Date(`${startDate}T00:00:00.000Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || Number.isNaN(start.getTime()) || start.toISOString().slice(0, 10) !== startDate || start > asOf) return "Not available";
  let years = asOf.getUTCFullYear() - start.getUTCFullYear();
  let months = asOf.getUTCMonth() - start.getUTCMonth();
  if (asOf.getUTCDate() < start.getUTCDate()) months -= 1;
  if (months < 0) { years -= 1; months += 12; }
  if (years < 0) return "Not available";
  return `${years} ${years === 1 ? "year" : "years"}, ${months} ${months === 1 ? "month" : "months"}`;
}

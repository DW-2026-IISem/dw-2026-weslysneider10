export function isValidNit(nit: string): boolean {
  const nitRegex = /^\d{5,15}(-\d)?$/;
  return nitRegex.test(nit);
}

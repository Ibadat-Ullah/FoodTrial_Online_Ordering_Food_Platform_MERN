export function isValidPricedOptionInput(value) {
  if (typeof value !== "string") return false;
  const lines = value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (lines.length > 20) return false;

  return lines.every((line) => {
    const separator = line.lastIndexOf(":");
    const name = line.slice(0, separator).trim();
    const price = line.slice(separator + 1).trim();
    return (
      separator > 0 &&
      name.length > 0 &&
      name.length <= 60 &&
      /^\d+(?:\.\d{1,2})?$/.test(price) &&
      Number(price) <= 100000
    );
  });
}

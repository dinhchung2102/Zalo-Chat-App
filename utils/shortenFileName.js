export function shortenFilename(filename, maxLength = 30) {
  if (filename.length <= maxLength) return filename;

  const extIndex = filename.lastIndexOf('.');
  const ext = extIndex !== -1 ? filename.slice(extIndex) : '';
  const name = extIndex !== -1 ? filename.slice(0, extIndex) : filename;

  const remainLength = maxLength - ext.length - 3; // 3 for "..."

  if (remainLength <= 0) {
    return '...' + ext; // fallback
  }

  const frontChars = Math.ceil(remainLength / 2);
  const backChars = Math.floor(remainLength / 2);

  const firstPart = name.slice(0, frontChars);
  const lastPart = name.slice(-backChars);

  return `${firstPart}...${lastPart}${ext}`;
}

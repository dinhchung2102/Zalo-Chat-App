export function getFileType(filename) {
  const extIndex = filename.lastIndexOf('.');
  if (extIndex === -1 || extIndex === filename.length - 1) {
    return '';
  }

  return filename.slice(extIndex + 1).toUpperCase();
}

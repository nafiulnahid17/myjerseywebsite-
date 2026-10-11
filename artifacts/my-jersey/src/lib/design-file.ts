/** Preview only: no server upload and no file bytes in localStorage. */
export const MAX_DESIGN_BYTES = 10 * 1024 * 1024;
const formats = {
  png: { mime: 'image/png', signature: (b: Uint8Array) => [137, 80, 78, 71, 13, 10, 26, 10].every((v, i) => b[i] === v) },
  jpg: { mime: 'image/jpeg', signature: (b: Uint8Array) => b[0] === 255 && b[1] === 216 && b[2] === 255 },
  jpeg: { mime: 'image/jpeg', signature: (b: Uint8Array) => b[0] === 255 && b[1] === 216 && b[2] === 255 },
  webp: { mime: 'image/webp', signature: (b: Uint8Array) => new TextDecoder().decode(b.slice(0, 4)) === 'RIFF' && new TextDecoder().decode(b.slice(8, 12)) === 'WEBP' },
  pdf: { mime: 'application/pdf', signature: (b: Uint8Array) => new TextDecoder().decode(b.slice(0, 5)) === '%PDF-' },
};

export async function validateDesignFile(file: File): Promise<string | null> {
  if (!file.size) return 'That file is empty. Choose a design image or PDF.';
  if (file.size > MAX_DESIGN_BYTES) return 'Choose a file smaller than 10 MB.';
  if (file.name.length > 255) return 'Shorten the filename to 255 characters or fewer.';
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  if (!Object.prototype.hasOwnProperty.call(formats, ext)) return 'Choose a PNG, JPG, WebP or PDF design. SVG and executable files are not supported.';
  const format = formats[ext as keyof typeof formats];
  if (file.type && file.type !== format.mime) return 'The file type does not match its extension. Export a fresh PNG, JPG, WebP or PDF.';
  try {
    const bytes = new Uint8Array(await file.slice(0, 16).arrayBuffer());
    if (!format.signature(bytes)) return 'This file is not a valid image or PDF of the selected type.';
  } catch {
    return 'This file could not be read. Please select it again.';
  }
  return null;
}

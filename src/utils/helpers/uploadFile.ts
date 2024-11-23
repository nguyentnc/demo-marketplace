export const checkMaxSize = (file: File, maxSize: number): boolean => {
  const fileSizeKiloBytes = file.size / 1024;
  return !(fileSizeKiloBytes > maxSize);
};

export const checkMinSize = (file: File, minSize: number): boolean => {
  const fileSizeKiloBytes = file.size / 1024;
  return !(fileSizeKiloBytes < minSize);
};

export const checkSupportFiles = (
  file: File,
  supportFiles: string[]
): boolean => {
  const extensionFile = file.type;
  if (extensionFile) {
    return supportFiles.includes(extensionFile);
  }

  return false;
};

export const convertBytesToMegaBytes = (sizeBytes: number) => {
  const bytesToMegaBytes = sizeBytes / 1024 ** 2;
  return bytesToMegaBytes;
};

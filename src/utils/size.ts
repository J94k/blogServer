interface Size {
  bytes: number;
  KiB: number;
  MiB: number;
  GiB: number;
  size: string;
}

const formatSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + 'B';
  if (bytes < 1024 ** 2) return (bytes / 1024).toFixed(2) + 'KiB';
  if (bytes < 1024 ** 3) return (bytes / 1024 ** 2).toFixed(2) + 'MiB';
  if (bytes < 1024 ** 4) return (bytes / 1024 ** 3).toFixed(2) + 'GiB';

  return (bytes / 1024 ** 4).toFixed(2) + 'TiB';
};

const getSizeOf = <T>(data: T): Size => {
  if (!data) throw new Error('No data is presented');

  let buff = 0;

  if (typeof data === 'string') {
    buff += new Blob(data.split('')).size;
  }

  if (typeof data === 'number' || typeof data === 'bigint') {
    buff += 8;
  }

  if (typeof data === 'boolean') {
    buff += 4;
  }

  if (data && typeof data === 'object' && !Array.isArray(data)) {
    Object.entries(data).forEach((element) => {
      if (!Array.isArray(data)) buff += new Blob(element[0].split('')).size;

      buff += getSizeOf(element[1]).bytes;
    });
  }

  return {
    bytes: buff,
    KiB: buff / 1024,
    MiB: buff / 1024 ** 2,
    GiB: buff / 1024 ** 3,
    size: formatSize(buff),
  };
};

export default {
  getSizeOf,
};

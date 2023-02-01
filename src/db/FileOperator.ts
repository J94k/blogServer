import jsonUtils from '../utils/json.ts';

const operator = {
  json: {
    read: jsonUtils.read,
    write: jsonUtils.write,
  },
};

type Format = 'json';

interface FileOperatorView {
  format: Format;
  read: (path: string) => Promise<unknown | never>;
  write: (path: string, content: unknown) => Promise<void | never>;
}

class FileOperator implements FileOperatorView {
  format;

  constructor(format: Format) {
    this.format = format;
  }

  read(path: string) {
    return operator[this.format].read(path);
  }

  write(path: string, content: unknown) {
    return operator[this.format].write(path, content);
  }
}

export default FileOperator;

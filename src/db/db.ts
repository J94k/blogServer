import config from '../config.ts';
import FileOperator from './FileOperator.ts';

interface DBView {
  // 'key1:key2:key3'
  get(keys: string): Promise<unknown | never>;
}

class DB implements DBView {
  private fp = '';
  private fileOperator;

  constructor({
    filePath,
    fileOperator,
  }: {
    filePath: string;
    fileOperator: FileOperator;
  }) {
    if (!filePath) throw new SyntaxError('No file path');

    this.fp = filePath;
    this.fileOperator = fileOperator;
  }

  async get(keys: string) {
    try {
      const file = await this.fileOperator.read(this.fp);

      if (keys === '*') return file;

      const keysList = keys.split(':');
      let target = file;

      for (const k of keysList) {
        if (!target[k]) throw new Error('Wrong keys');

        target = target[k];
      }

      return target;
    } catch (e) {
      throw new Error(`DB.get(): ${e.message}`);
    }
  }
}

export default {
  authors: new DB({
    filePath: config.authorsDbPath,
    fileOperator: new FileOperator('json'),
  }),
  blog: new DB({
    filePath: config.blogDbPath,
    fileOperator: new FileOperator('json'),
  }),
};

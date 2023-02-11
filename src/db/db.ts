import config from '../config.ts';
import FileOperator from './FileOperator.ts';

interface DBView {
  // 'key1:key2:key3'
  get(keys: string): Promise<unknown | never>;
}

class DB implements DBView {
  private fp = '';
  private fileOperator;
  private postsDir: string;

  constructor({
    filePath,
    fileOperator,
    postsDir,
  }: {
    filePath: string;
    fileOperator: FileOperator;
    postsDir: string;
  }) {
    if (!filePath) throw new SyntaxError('No file path');

    this.fp = filePath;
    this.fileOperator = fileOperator;
    this.postsDir = postsDir;
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

  async getPost(id: string): Promise<string | false> {
    try {
      await Deno.stat(`${this.postsDir}/${id}.md`);

      return await Deno.readTextFile(`${this.postsDir}/${id}.md`);
    } catch (error) {
      if (!(error instanceof Deno.errors.NotFound)) {
        console.error('Error while getting the post', error);
      }

      return false;
    }
  }
}

export default {
  authors: new DB({
    filePath: config.authorsDbPath,
    fileOperator: new FileOperator('json'),
    postsDir: config.postsDir,
  }),
  blog: new DB({
    filePath: config.blogDbPath,
    fileOperator: new FileOperator('json'),
    postsDir: config.postsDir,
  }),
};

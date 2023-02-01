type Json = { [key: string]: Json };

const read = async (path: string): Promise<Json | never> => {
  const content = await Deno.readTextFile(path);

  return JSON.parse(content);
};

const write = async (path: string, content: unknown): Promise<void | never> => {
  const str = JSON.stringify(content);

  await Deno.writeTextFile(path, str);
};

export default {
  read,
  write,
};

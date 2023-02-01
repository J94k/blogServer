const encoder = new TextEncoder();
const decoder = new TextDecoder();

const encode = (text: string): Uint8Array => {
  return encoder.encode(text);
};

const decode = (data: Uint8Array): string => {
  return decoder.decode(data);
};

export default {
  encode,
  decode,
};

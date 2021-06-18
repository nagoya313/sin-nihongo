import { Buffer } from 'buffer';

export const idDecoder = (id: string, entityName: string) => {
  const decode = Buffer.from(id, 'base64')
    .toString()
    .replace(new RegExp(`^${entityName}:`), '');

  switch (entityName) {
    case 'Radical':
    case 'Kanji':
      return parseInt(decode);
  }
};

import crypto from 'crypto';

export default {
  hash: (salt: string | undefined, text: string): string => crypto.createHash('sha512').update(`${salt}${text}`).digest('hex').substring(0, 32),
};

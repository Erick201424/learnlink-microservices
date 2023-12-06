// encryption.ts

import { AES, enc } from 'crypto-ts';
import * as dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.ENCRYPTION_KEY || 'ZicCbmXGNy6z3oiKroRB6swv+VexUreyEroXOQPgTFo=';

export function encrypt(text: string): string {
    const encrypted = AES.encrypt(text, secretKey);
    return encrypted.toString();
}

export function decrypt(encryptedText: string): string {
    const decrypted = AES.decrypt(encryptedText, secretKey);
    return decrypted.toString(enc.Utf8);
}

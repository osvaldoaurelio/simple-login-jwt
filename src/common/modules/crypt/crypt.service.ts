import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class CryptService {
  hash(plain: Buffer | string, options?: argon2.Options & { raw?: false }) {
    return argon2.hash(plain, options);
  }

  verify(hash: string, plain: Buffer | string, options?: argon2.Options) {
    return argon2.verify(hash, plain, options);
  }
}

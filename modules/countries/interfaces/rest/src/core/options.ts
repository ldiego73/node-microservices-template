import fs from 'fs';
import path from 'path';
import { ServerOptionsAsSecureHttp2 } from 'fastify';

const readCert = (cert: string): Buffer =>
  fs.readFileSync(path.join(process.cwd(), cert));

export const options = (
  key: string,
  cert: string
): ServerOptionsAsSecureHttp2 => ({
  http2: true,
  https: {
    allowHTTP1: true,
    key: readCert(key),
    cert: readCert(cert),
  },
});

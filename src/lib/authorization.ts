import crypto from 'crypto';

import { RequestConfig } from './vuforia';

function createSignatureString(request: RequestConfig) {
  const md5Body = crypto.createHash('md5').update(request.body).digest('hex');

  return `${request.method}
${md5Body}
${request.type}
${request.timestamp}
${request.path}`;
}

function createSignature(request: RequestConfig) {
  const signatureString = createSignatureString(request);
  return crypto
    .createHmac('sha1', request.serverSecretKey)
    .update(signatureString)
    .digest('base64');
}

export function createAuthorization(request: RequestConfig) {
  return `VWS ${request.serverAccessKey}:${createSignature(request)}`;
}

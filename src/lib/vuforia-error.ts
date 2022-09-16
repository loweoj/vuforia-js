import { VuforiaApi } from './vuforia-api-types';

export class VuforiaError extends Error {
  resultCode: string;
  statusCode: number;
  message: string;
  name: string;
  fullResponse: any;

  constructor(
    errorCode: VuforiaApi.ErrorCode,
    statusCode: number,
    fullResponse?: any
  ) {
    super(errorCode);
    Object.setPrototypeOf(this, VuforiaError.prototype);

    this.name = 'VuforiaError';
    this.resultCode = errorCode;
    this.statusCode = statusCode;
    this.fullResponse = fullResponse;

    let message;

    if (errorCode === 'Fail') {
      // Get the message for the provided status code.
      const statusErrorCode = (errorCode + statusCode) as VuforiaApi.ErrorCode;
      message =
        VuforiaApi.ErrorCodes[statusErrorCode] || VuforiaApi.ErrorCodes.Fail;
    } else {
      message = VuforiaApi.ErrorCodes[errorCode];
    }

    this.message = errorCode + ' - ' + message;
  }

  getRawResponse() {
    return this.fullResponse;
  }
}

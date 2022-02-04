import { VuforiaApi } from './vuforia-api-types';

export class VuforiaError extends Error {
  resultCode: string;
  statusCode: number;
  message: string;
  name: string;

  constructor(errorCode: VuforiaApi.ErrorCode, statusCode: number) {
    super(errorCode);
    Object.setPrototypeOf(this, VuforiaError.prototype);
    this.name = 'VuforiaError';
    this.resultCode = errorCode;
    this.statusCode = statusCode;

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
}

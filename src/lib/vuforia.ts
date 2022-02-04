import fs from 'fs';

import axios, { Method } from 'axios';

import { createAuthorization } from './authorization';
import { VuforiaApi } from './vuforia-api-types';
import { VuforiaError } from './vuforia-error';

export interface VuforiaOptions {
  readonly serverAccessKey: string;
  readonly serverSecretKey: string;
  readonly vwsHostname?: string;
}

export interface Request {
  readonly path: string;
  readonly method: Method;
  readonly body: string;
}

export interface RequestConfig extends Request {
  readonly serverAccessKey: string;
  readonly serverSecretKey: string;
  readonly timestamp: string;
  readonly type: string;
}

/**
 * Vuforia API client.
 */
export class Vuforia {
  private readonly serverAccessKey: string;
  private readonly serverSecretKey: string;
  private readonly vwsHostname: string;

  constructor(options: VuforiaOptions) {
    this.serverAccessKey = options.serverAccessKey;
    this.serverSecretKey = options.serverSecretKey;
    this.vwsHostname = options.vwsHostname || 'https://vws.vuforia.com';
  }

  async addTarget(
    target: VuforiaApi.Target
  ): Promise<VuforiaApi.AddTargetResponse> {
    return this._makeApiRequest<VuforiaApi.AddTargetResponse>({
      path: '/targets',
      method: 'POST',
      body: JSON.stringify(target),
    });
  }

  async deleteTarget(targetId: string) {
    return this._makeApiRequest<VuforiaApi.DeleteTargetResponse>({
      path: '/targets/' + targetId,
      method: 'DELETE',
      body: '',
    });
  }

  async updateTarget(targetId: string, target: Partial<VuforiaApi.Target>) {
    return this._makeApiRequest<VuforiaApi.UpdateTargetResponse>({
      path: '/targets/' + targetId,
      method: 'PUT',
      body: JSON.stringify(target),
    });
  }

  async retrieveTarget(targetId: string) {
    return this._makeApiRequest<VuforiaApi.RetrieveTargetResponse>({
      path: '/targets/' + targetId,
      method: 'GET',
      body: '',
    });
  }

  async findDuplicates(targetId: string) {
    return this._makeApiRequest<VuforiaApi.DuplicateTargetResponse>({
      path: '/duplicates/' + targetId,
      method: 'GET',
      body: '',
    });
  }

  async targetSummary(targetId: string) {
    return this._makeApiRequest<VuforiaApi.TargetSummaryResponse>({
      path: '/summary/' + targetId,
      method: 'GET',
      body: '',
    });
  }

  async databaseSummary() {
    return this._makeApiRequest<VuforiaApi.DatabaseSummaryResponse>({
      path: '/summary',
      method: 'GET',
      body: '',
    });
  }

  /**
   * Utils
   */
  static get utils() {
    return {
      encodeFileBase64(filePath: string) {
        return new Promise<string>((resolve, reject) => {
          fs.readFile(filePath, 'base64', (error, data) => {
            /* istanbul ignore if */
            if (error) {
              return reject(error);
            }
            resolve(data);
          });
        });
      },

      encodeTextBase64(content: string) {
        return Buffer.from(content).toString('base64');
      },
    };
  }

  /**
   * Make a request to the Vuforia API.
   */
  private async _makeApiRequest<R>(request: Request): Promise<R> {
    const config: RequestConfig = {
      ...request,
      timestamp: new Date().toUTCString(),
      serverAccessKey: this.serverAccessKey,
      serverSecretKey: this.serverSecretKey,
      type: 'application/json',
    };

    try {
      const response = await axios.request<R>({
        method: config.method,
        baseURL: this.vwsHostname,
        url: config.path,
        headers: {
          'Content-Length': Buffer.byteLength(config.body).toString(),
          'Content-Type': config.type,
          Authorization: createAuthorization(config),
          Date: config.timestamp,
          'User-Agent': '',
        },
        data: config.body || undefined,
      });

      return response.data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data.result_code
      ) {
        throw new VuforiaError(
          error.response.data.result_code,
          error.response.status
        );
      }
      throw error;
    }
  }
}

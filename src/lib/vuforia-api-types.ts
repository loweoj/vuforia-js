/* eslint-disable no-unused-vars */

export namespace VuforiaApi {
  export interface Target {
    // name of the target, unique within a database
    readonly name: string;
    // width of the target in scene unit
    readonly width: number;
    // the base64 encoded binary recognition image data
    readonly image: string;
    // indicates whether or not the target is active for query
    readonly active_flag?: boolean;
    // the base64 encoded application metadata associated with the target
    readonly application_metadata?: string;
  }

  export enum ErrorCodes {
    AuthenticationFailure = 'Signature authentication failed.',
    RequestTimeTooSkewed = 'Request timestamp outside allowed range.',
    TargetNameExist = 'The corresponding target name already exists.',
    RequestQuotaReached = 'The maximum number of API calls for this database has been reached.',
    TargetStatusProcessing = 'The target is in the processing state and cannot be updated.',
    TargetStatusNotSuccess = 'The request could not be completed because the target is not in the success state.',
    TargetQuotaReached = 'The maximum number of targets for this database has been reached.',
    ProjectSuspended = 'The request could not be completed because this database has been suspended.',
    ProjectInactive = 'The request could not be completed because this database is inactive.',
    ProjectHasNoApiAccess = 'The request could not be completed because this database is not allowed to make API requests.',
    UnknownTarget = 'The specified target ID does not exist.',
    BadImage = 'Image corrupted or format not supported.',
    ImageTooLarge = 'Target metadata size exceeds maximum limit.',
    MetadataTooLarge = 'Image size exceeds maximum limit.',
    DateRangeError = 'Start date is after the end date.',
    Fail = 'The server encountered an internal error, please retry the request.',
    // define separate fail messages depending on status code
    Fail422 = 'The request was invalid and could not be processed. Check the request headers and fields.',
    Fail500 = 'The server encountered an internal error, please retry the request.',
  }

  export enum SuccessCodes {
    Success = 'Transaction succeeded.',
    TargetCreated = 'Target created.',
  }

  export type ErrorCode = keyof typeof ErrorCodes;
  export type SuccessCode = keyof typeof SuccessCodes;
  export type ResultCode = keyof typeof ErrorCodes | keyof typeof SuccessCodes;

  export type TargetStatus = 'processing' | 'success' | 'failed';

  // Responses
  interface BaseResponse {
    readonly result_code: ResultCode;
    readonly transaction_id: string;
  }

  export interface ErrorResponse extends BaseResponse {}
  export interface DeleteTargetResponse extends BaseResponse {}
  export interface UpdateTargetResponse extends BaseResponse {}
  export interface AddTargetResponse extends BaseResponse {
    readonly target_id: string;
  }

  export interface RetrieveTargetResponse extends BaseResponse {
    target_record: Target & {
      target_id: string;
      tracking_rating: number;
      reco_rating: string;
    };
    status: TargetStatus;
  }

  export interface DuplicateTargetResponse extends BaseResponse {
    similar_targets: string[];
  }

  export interface TargetSummaryResponse extends BaseResponse {
    status: TargetStatus;
    database_name: string;
    target_name: string;
    upload_date: string;
    active_flag: boolean;
    tracking_rating?: number;
    reco_rating?: string;
    total_recos?: number;
    current_month_recos?: number;
    previous_month_recos?: number;
  }

  export interface DatabaseSummaryResponse extends BaseResponse {
    name: string;
    active_images: number;
    inactive_images: number;
    failed_images: number;

    // undocumented fields
    processing_images?: number;
    target_quota?: number;
    request_quota?: number;
    reco_threshold?: number;
    request_usage?: number;
    total_recos?: number;
    current_month_recos?: number;
    previous_month_recos?: number;
  }
}

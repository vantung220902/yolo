declare interface FieldError {
  message: string;
  field: string;
}
declare interface IResponse {
  code: number;
  success: boolean;
  message?: string;
  error?: FieldError[] | undefined;
}
declare interface ResponseGenerator {
  config?: any;
  data?: IResponse & any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

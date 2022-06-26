declare interface IResponse {
    code: number;
    success: boolean;
    message?: string;
}
declare interface FieldError {
    message: string;
    field: string;
}
declare interface ResponseGenerator {
    config?: any,
    data?: any,
    headers?: any,
    request?: any,
    status?: number,
    statusText?: string
}
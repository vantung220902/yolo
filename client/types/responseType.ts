export interface IResponse{
    code: number;
    success: boolean;
    message?: string;
}
export interface ResponseGenerator {
    config?: any,
    data?: any,
    headers?: any,
    request?: any,
    status?: number,
    statusText?: string
}
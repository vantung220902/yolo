import { FieldError } from "../types/errorType";

export const mapFieldErrors = (error: FieldError[]): { [key: string]: string } => error.reduce((accumulated, e) => ({
    ...accumulated,
    [e.field]: [e.message]
}), {})
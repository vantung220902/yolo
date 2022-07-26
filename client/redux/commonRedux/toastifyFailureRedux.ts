import { toast } from 'react-toastify';

const defaultApiErrorMessage = 'Something went wrong!';

export function toastifyError(response: any, context?: string) {
  toast.error(`${context ? `${context}: ` : ''}${response?.data?.details || response?.data?.message || defaultApiErrorMessage}`);
}
export function* toastifyErrorSaga(response: any, context?: string) {
  toastifyError(response, context);
}

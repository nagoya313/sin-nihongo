import { type ValidationErrorResponseData } from 'remix-validated-form';

export const isErrorData = (data: any): data is ValidationErrorResponseData => 'fieldErrors' in data;

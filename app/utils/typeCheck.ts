import { type TypedResponse } from '@remix-run/node';
import { type ValidationErrorResponseData } from 'remix-validated-form';

export const isErrorData = (data: any): data is TypedResponse<ValidationErrorResponseData> => 'fieldErrors' in data;

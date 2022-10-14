import { type SerializeFrom } from '@remix-run/node';
import { type ValidationErrorResponseData } from 'remix-validated-form';

export const isErrorData = (data: any): data is SerializeFrom<ValidationErrorResponseData> => 'fieldErrors' in data;

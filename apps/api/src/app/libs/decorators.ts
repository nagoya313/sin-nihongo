import { Body, QueryParams } from 'routing-controllers';

export const ValidateQueryParams = QueryParams({ validate: { whitelist: true, forbidNonWhitelisted: true } });
export const ValidateBody = Body({ validate: { whitelist: true, forbidNonWhitelisted: true } });

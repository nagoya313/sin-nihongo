import { Body, QueryParams } from 'routing-controllers';

// どうもメソッドがwhitelistに自動的に追加される仕様のやうのでパラメータのチェックが不完全な気がする
// constructor等のパラメータが来ても例外が飛ばない
export const ValidateQueryParams = QueryParams({ validate: { whitelist: true, forbidNonWhitelisted: true } });
export const ValidateBody = Body({ validate: { whitelist: true, forbidNonWhitelisted: true } });

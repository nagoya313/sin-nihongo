import useAxios from 'axios-hooks';

export const useLazyAxiosGet = <T>(url: string) => {
  return useAxios<T, Error>(
    {
      baseURL: url,
      method: 'GET', // prodでビルドするとこゝを明示的に指定しないとtoUpperCase undefinedエラーになる
    },
    { useCache: false, manual: true }
  );
};

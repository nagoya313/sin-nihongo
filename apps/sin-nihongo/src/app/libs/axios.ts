import useAxios from 'axios-hooks';

export const useAxiosGet = <T>(url: string) => {
  return useAxios<T, Error>(
    {
      baseURL: url,
      method: 'GET', // prodでビルドするとこゝを明示的に指定しないとtoUpperCase undefinedエラーになる
    },
    { useCache: false }
  );
};

export const useLazyAxiosGet = <T>(url: string) => {
  return useAxios<T, Error>(
    {
      baseURL: url,
      method: 'GET', // prodでビルドするとこゝを明示的に指定しないとtoUpperCase undefinedエラーになる
    },
    { useCache: false, manual: true }
  );
};

export const useLazyAxiosDelete = <T>(url: string) => {
  return useAxios<T, Error>(
    {
      baseURL: url,
      method: 'DELETE',
    },
    { useCache: false, manual: true }
  );
};

import { useAuth0 } from '@auth0/auth0-react';

const getAccessTokenOptions = {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  audience: process.env.NX_API_IDENTIFIER!,
};

const accessTokenHeader = (token: string) => ({ Authorization: `Bearer ${token}` });

export const useAccessToken = () => {
  const { getAccessTokenSilently } = useAuth0();

  return async () => {
    const token = await getAccessTokenSilently(getAccessTokenOptions);
    return accessTokenHeader(token);
  };
};

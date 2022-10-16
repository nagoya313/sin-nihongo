import { type UseToastOptions } from '@chakra-ui/react';
import { createCookieSessionStorage, type DataFunctionArgs } from '@remix-run/node';
import { Authenticator } from 'remix-auth';
import { Auth0Strategy } from 'remix-auth-auth0';
import { AUTH0_CALLBACK_URL, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN } from './constants';

export type User = {
  email: string;
  displayName: string;
  picture: string;
};

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_remix_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env['SESSION_SECRET']!],
    secure: process.env.NODE_ENV === 'production',
  },
});

export const authenticator = new Authenticator<User>(sessionStorage);

const auth0Strategy = new Auth0Strategy(
  {
    callbackURL: AUTH0_CALLBACK_URL,
    clientID: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    domain: AUTH0_DOMAIN,
  },
  async ({ profile }) => ({
    email: profile.emails[0].value,
    displayName: profile.displayName,
    picture: profile.photos[0].value,
  }),
);

authenticator.use(auth0Strategy);

export const { getSession, commitSession, destroySession } = sessionStorage;

type FlashOptions = {
  message: string;
  status: UseToastOptions['status'];
};

export const setFlashMessage = async (request: DataFunctionArgs['request'], options: FlashOptions) => {
  const session = await getSession(request.headers.get('Cookie'));
  session.flash('flash-message', options);
  return session;
};

export const getFlashMessage = async (request: DataFunctionArgs['request']) => {
  const session = await getSession(request.headers.get('Cookie'));
  const flash = (session.get('flash-message') ?? null) as FlashOptions | null;
  return { flash, session } as const;
};

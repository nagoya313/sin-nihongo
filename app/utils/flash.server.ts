import { type UseToastOptions } from '@chakra-ui/react';
import { type DataFunctionArgs, type Session } from '@remix-run/node';
import { commitSession, getSession } from '~/session.server';

export type FlashOptions = {
  message: string;
  status: UseToastOptions['status'];
};

const setCookieCommitSessionHeaders = async (session: Session) => ({ 'Set-Cookie': await commitSession(session) });

export const setFlashMessage = async (request: DataFunctionArgs['request'], options: FlashOptions) => {
  const session = await getSession(request.headers.get('Cookie'));
  session.flash('flash-message', options);
  return { headers: await setCookieCommitSessionHeaders(session) } as const;
};

export const getFlashMessage = async (request: DataFunctionArgs['request']) => {
  const session = await getSession(request.headers.get('Cookie'));
  const flash = (session.get('flash-message') ?? null) as FlashOptions | null;
  return { flash, headers: { headers: await setCookieCommitSessionHeaders(session) } } as const;
};

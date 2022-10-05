import { useMatches } from '@remix-run/react';
import { useMemo } from 'react';
import { type User } from '~/session.server';

const useMatchesData = (id: string): Record<string, unknown> | undefined => {
  const matchingRoutes = useMatches();
  const route = useMemo(() => matchingRoutes.find((route) => route.id === id), [matchingRoutes, id]);
  return route?.data;
};

const isUser = (user: any): user is User => user && typeof user === 'object' && typeof user.email === 'string';

export const useOptionalUser = () => {
  const data = useMatchesData('root');
  if (!data || !isUser(data['user'])) return undefined;
  return data['user'];
};

export const useUser = () => {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      'No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.',
    );
  }
  return maybeUser;
};

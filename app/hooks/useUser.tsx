import { type User } from '~/session.server';
import useMatchesData from './useMatchesData';

const isUser = (user: any): user is User => user && typeof user === 'object' && typeof user.email === 'string';

export const useOptionalUser = () => {
  const data = useMatchesData<{ user: User }>('/');
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

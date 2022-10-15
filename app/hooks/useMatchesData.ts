import { type SerializeFrom } from '@remix-run/node';
import { useMatches } from '@remix-run/react';
import { useMemo } from 'react';

const useMatchesData = <TData>(pathname: string): SerializeFrom<TData> => {
  const matchingRoutes = useMatches();
  const route = useMemo(() => matchingRoutes.find((route) => route.pathname === pathname), [matchingRoutes, pathname]);
  return route!.data as SerializeFrom<TData>;
};

export default useMatchesData;

import { type LoaderArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { getByCodePoint } from '~/features/radicals/services.server';

export const loader = async (args: LoaderArgs) => getByCodePoint(args);

const Radical = () => <Outlet />;

export default Radical;

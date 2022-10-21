import { type LoaderArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { get } from '~/features/radicals/services.server';

export const loader = async (args: LoaderArgs) => get(args);

const Radical = () => <Outlet />;

export default Radical;

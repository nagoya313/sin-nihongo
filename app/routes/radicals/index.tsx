import { Icon } from '@chakra-ui/react';
import { json, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { MdOutlinePark } from 'react-icons/md';
import { validationError } from 'remix-validated-form';
import PageInfo from '~/components/PageInfo';
import Radicals from '~/features/radicals/components/Radicals';
import { radicalReadOrder, radicalStrokeCountOrder } from '~/features/radicals/models/radicals.server';
import { radicalQueryParams } from '~/features/radicals/validators/params';

export const meta: MetaFunction = () => ({
  title: '新日本語｜部首索引',
});

export const loader = async ({ request }: LoaderArgs) => {
  const result = await radicalQueryParams.validate(new URL(request.url).searchParams);
  if (result.error) {
    console.log(result.error.fieldErrors);
    return validationError(result.error);
  }
  if (result.data.orderBy === 'read') {
    return json(await radicalReadOrder(result.data));
  }
  return json(await radicalStrokeCountOrder(result.data));
};

const Index = () => (
  <>
    <PageInfo avatar={<Icon fontSize={24} as={MdOutlinePark} />} title="部首索引" />
    <Radicals />
  </>
);

export default Index;

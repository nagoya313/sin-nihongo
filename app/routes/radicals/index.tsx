import { Icon } from '@chakra-ui/react';
import { type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { MdOutlinePark } from 'react-icons/md';
import { validationError } from 'remix-validated-form';
import PageInfo from '~/components/PageInfo';
import RadicalSearchPanel from '~/features/radicals/components/RadicalSearchPanel';
import RadicalSearcResult from '~/features/radicals/components/RadicalSearchResult';
import { radicalQueryParams } from '~/features/radicals/validators/params';

export const meta: MetaFunction = () => ({
  title: '新日本語｜部首索引',
});

export const loader = async ({ request }: LoaderArgs) => {
  const result = await radicalQueryParams.validate(new URL(request.url).searchParams);
  if (result.error) return validationError(result.error);
  return {};
};

const Index = () => (
  <>
    <PageInfo avatar={<Icon fontSize={24} as={MdOutlinePark} />} title="部首索引" />
    <RadicalSearchPanel />
    <RadicalSearcResult />
  </>
);

export default Index;

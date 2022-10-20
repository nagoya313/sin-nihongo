import { HStack, Icon, TabPanel } from '@chakra-ui/react';
import { type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ValidatedForm } from 'remix-validated-form';
import { ReadIcon } from '~/components/icons';
import OrderTabs from '~/components/OrderTabs';
import Page from '~/components/Page';
import ReadOrder from '~/components/ReadOrder';
import SearchPanel from '~/components/SearchPanel';
import StrokeCountSearchInput from '~/components/StrokeCountSearchInput';
import KanjiReadSearchInput from '~/features/kanjis/components/KanjiReadSearchInput';
import RegularSelectRadio from '~/features/kanjis/components/RegularSelectRadio';
import { READ_SEARCH_FROM_ID } from '~/features/reads/constants';
import { get } from '~/features/reads/services.server';
import { MAX_STROKE_COUNT, MIN_STROKE_COUNT, readKanjiQueryParams } from '~/features/reads/validators';
import { useSearch } from '~/hooks/useSearch';

export const meta: MetaFunction = () => ({ title: '新日本語｜音訓索引' });
export const loader = async ({ request }: LoaderArgs) => get(request);

const Reads = () => {
  const { data, formProps } = useSearch({
    formId: READ_SEARCH_FROM_ID,
    validator: readKanjiQueryParams,
    initialData: useLoaderData<typeof loader>(),
  });

  return (
    <Page avatar={<Icon fontSize={24} as={ReadIcon} />} title="音訓索引">
      <ValidatedForm {...formProps}>
        <SearchPanel>
          <HStack align="center">
            <KanjiReadSearchInput />
            <StrokeCountSearchInput min={MIN_STROKE_COUNT} max={MAX_STROKE_COUNT} />
            <RegularSelectRadio />
          </HStack>
        </SearchPanel>
        <OrderTabs orders={[{ key: 'read', label: 'よみかた順' }]}>
          <TabPanel>{'kanjis' in data && <ReadOrder data={data.kanjis} to="/kanjis" />}</TabPanel>
        </OrderTabs>
      </ValidatedForm>
    </Page>
  );
};

export default Reads;

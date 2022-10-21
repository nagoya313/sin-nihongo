import { HStack, Icon, TabPanel } from '@chakra-ui/react';
import { type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ValidatedForm } from 'remix-validated-form';
import OrderTabs from '~/components/OrderTabs';
import Page from '~/components/Page';
import ReadOrder from '~/components/ReadOrder';
import SearchPanel from '~/components/SearchPanel';
import SearchStrokeCountInput from '~/components/SearchStrokeCountInput';
import { ReadIcon } from '~/components/icons';
import ForNameSelectRadio from '~/features/kanjis/components/ForNameSelectRadio';
import JisLevelSelectRadio from '~/features/kanjis/components/JisLevelSelectRadio';
import RegularSelectRadio from '~/features/kanjis/components/RegularSelectRadio';
import SearchKanjiReadInput from '~/features/kanjis/components/SearchKanjiReadInput';
import { READ_SEARCH_FROM_ID } from '~/features/reads/constants';
import { index } from '~/features/reads/services.server';
import { MAX_STROKE_COUNT, MIN_STROKE_COUNT, readKanjiQueryParams } from '~/features/reads/validators';
import { useSearch } from '~/hooks/useSearch';

export const meta: MetaFunction = () => ({ title: '新日本語｜音訓索引' });
export const loader = (args: LoaderArgs) => index(args);

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
            <SearchKanjiReadInput />
            <SearchStrokeCountInput min={MIN_STROKE_COUNT} max={MAX_STROKE_COUNT} />
          </HStack>
          <HStack align="center">
            <RegularSelectRadio />
            <ForNameSelectRadio />
            <JisLevelSelectRadio />
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

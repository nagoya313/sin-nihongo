import { HStack, Icon, TabPanel } from '@chakra-ui/react';
import { type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ValidatedForm } from 'remix-validated-form';
import OrderTabs from '~/components/OrderTabs';
import Page from '~/components/Page';
import SearchPanel from '~/components/SearchPanel';
import StrokeCountOrder from '~/components/StrokeCountOrder';
import { StrokeCountIcon } from '~/components/icons';
import ForNameSelectRadio from '~/features/kanjis/components/ForNameSelectRadio';
import JisLevelSelectRadio from '~/features/kanjis/components/JisLevelSelectRadio';
import RegularSelectRadio from '~/features/kanjis/components/RegularSelectRadio';
import SearchKanjiReadInput from '~/features/kanjis/components/SearchKanjiReadInput';
import SearchRadicalSelectInput from '~/features/kanjis/components/SearchRadicalSelectInput';
import { STROKE_COUNT_SEARCH_FROM_ID } from '~/features/strokeCounts/constants';
import { index } from '~/features/strokeCounts/services.server';
import { strokeCountKanjiQueryParams } from '~/features/strokeCounts/validators';
import { useSearch } from '~/hooks/useSearch';

export const meta: MetaFunction = () => ({ title: '新日本語｜画数索引' });
export const loader = (args: LoaderArgs) => index(args);

const StrokeCounts = () => {
  const { data, formProps } = useSearch({
    formId: STROKE_COUNT_SEARCH_FROM_ID,
    validator: strokeCountKanjiQueryParams,
    initialData: useLoaderData<typeof loader>(),
  });

  return (
    <Page avatar={<Icon fontSize={24} as={StrokeCountIcon} />} title="画数索引">
      <ValidatedForm {...formProps}>
        <SearchPanel>
          <HStack align="center">
            <SearchKanjiReadInput />
            <SearchRadicalSelectInput />
          </HStack>
          <HStack align="center">
            <RegularSelectRadio />
            <ForNameSelectRadio />
            <JisLevelSelectRadio />
          </HStack>
        </SearchPanel>
        <OrderTabs orders={[{ key: 'stroke_count', label: '画数順' }]}>
          <TabPanel>{'kanjis' in data && <StrokeCountOrder data={data.kanjis} to="/kanjis" />}</TabPanel>
        </OrderTabs>
      </ValidatedForm>
    </Page>
  );
};

export default StrokeCounts;

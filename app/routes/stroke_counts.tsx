import { HStack, Icon, TabPanel } from '@chakra-ui/react';
import { type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ValidatedForm } from 'remix-validated-form';
import { StrokeCountIcon } from '~/components/icons';
import OrderTabs from '~/components/OrderTabs';
import Page from '~/components/Page';
import SearchPanel from '~/components/SearchPanel';
import StrokeCountOrder from '~/components/StrokeCountOrder';
import KanjiReadSearchInput from '~/features/kanjis/components/KanjiReadSearchInput';
import RegularSelectRadio from '~/features/kanjis/components/RadicalSelectInput';
import { STROKE_COUNT_SEARCH_FROM_ID } from '~/features/strokeCounts/constants';
import { get } from '~/features/strokeCounts/services.server';
import { strokeCountKanjiQueryParams } from '~/features/strokeCounts/validators';
import { useSearch } from '~/hooks/useSearch';

export const meta: MetaFunction = () => ({ title: '新日本語｜画数索引' });
export const loader = async ({ request }: LoaderArgs) => get(request);

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
            <KanjiReadSearchInput />
            <RegularSelectRadio />
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

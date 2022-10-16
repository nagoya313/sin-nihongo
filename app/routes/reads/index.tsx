import { HStack, Icon, TabPanel } from '@chakra-ui/react';
import { type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { MdOutlineMic } from 'react-icons/md';
import { ValidatedForm } from 'remix-validated-form';
import { REGULAR_RADIO } from '~/components/constants';
import FormControl from '~/components/FormControl';
import NumberInput from '~/components/NumberInput';
import OrderTabs from '~/components/OrderTabs';
import Page from '~/components/Page';
import RadioGroup from '~/components/RadioGroup';
import ReadOrder from '~/components/ReadOrder';
import SearchPanel from '~/components/SearchPanel';
import TextInput from '~/components/TextInput';
import { READ_SEARCH_FROM_ID } from '~/features/kanjis/constants';
import { getKanjisOrderByRead } from '~/features/kanjis/models/kanji.server';
import { kanjiQueryParams, MAX_STOREKE_COUNT, MIN_STOREKE_COUNT } from '~/features/kanjis/validators/params';
import useSearch from '~/hooks/useSearch';
import { checkedQueryRequestLoader } from '~/utils/request';

export const meta: MetaFunction = () => ({
  title: '新日本語｜音訓索引',
});

export const loader = async ({ request }: LoaderArgs) =>
  checkedQueryRequestLoader(request, kanjiQueryParams, async (query) => ({
    kanjis: await getKanjisOrderByRead(query),
  }));

const Index = () => {
  const initialData = useLoaderData<typeof loader>();
  const { data, formProps } = useSearch(READ_SEARCH_FROM_ID, kanjiQueryParams, initialData);

  return (
    <Page avatar={<Icon fontSize={24} as={MdOutlineMic} />} title="音訓索引">
      <ValidatedForm {...formProps}>
        <SearchPanel>
          <HStack align="center">
            <FormControl
              name="read"
              label="よみかた"
              help="部首名は新日本語表音式によるひらがなでの前方一致で絞り込みができます。"
            >
              <TextInput name="read" placeholder="いち、しょー、つずみ" />
            </FormControl>
            <FormControl name="strokeCount" label="画数">
              <NumberInput
                name="strokeCount"
                placeholder={`${MIN_STOREKE_COUNT}〜${MAX_STOREKE_COUNT}`}
                min={MIN_STOREKE_COUNT}
                max={MAX_STOREKE_COUNT}
              />
            </FormControl>
            <FormControl as="fieldset" name="regular" label="常用漢字">
              <RadioGroup name="regular" radioLabels={REGULAR_RADIO} />
            </FormControl>
          </HStack>
        </SearchPanel>
        <OrderTabs formId={READ_SEARCH_FROM_ID} orders={[{ key: 'read', label: 'よみかた順' }]}>
          <TabPanel>{'kanjis' in data && <ReadOrder data={data.kanjis} to="/kanjis" />}</TabPanel>
        </OrderTabs>
      </ValidatedForm>
    </Page>
  );
};

export default Index;

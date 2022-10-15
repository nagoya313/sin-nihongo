import { HStack, TabPanel } from '@chakra-ui/react';
import { type MetaFunction } from '@remix-run/node';
import { useParams } from '@remix-run/react';
import { MdEdit } from 'react-icons/md';
import { $params, $path } from 'remix-routes';
import { ValidatedForm } from 'remix-validated-form';
import AdminLinkButton from '~/components/AdminLinkButton';
import { ORDERS, REGULAR_RADIO } from '~/components/constants';
import NumberInput from '~/components/NumberInput';
import OrderTabs from '~/components/OrderTabs';
import Page from '~/components/Page';
import RadioGroup from '~/components/RadioGroup';
import ReadOrder from '~/components/ReadOrder';
import SearchFormControl from '~/components/SearchFormControl';
import SearchPanel from '~/components/SearchPanel';
import StrokeCountOrder from '~/components/StrokeCountOrder';
import TextInput from '~/components/TextInput';
import {
  MAX_IN_RADICAL_STOREKE_COUNT,
  MIN_IN_RADICAL_STOREKE_COUNT,
  radicalKanjiQueryParams,
} from '~/features/kanjis/validators/params';
import RadicalDefine from '~/features/radicals/components/RadicalDefine';
import { RADICAL_SEARCH_FORM_ID } from '~/features/radicals/constants';
import useMatchesData from '~/hooks/useMatchesData';
import useSearch from '~/hooks/useSearch';
import { type loader } from '../$codePoint';

export const meta: MetaFunction = ({ params }) => ({
  title: `新日本語｜部首索引「${String.fromCodePoint(parseInt($params('/radicals/:codePoint', params).codePoint))}」`,
});

const Radical = () => {
  const { codePoint } = $params('/radicals/:codePoint', useParams());
  const data = useMatchesData<typeof loader>($path('/radicals/:codePoint', { codePoint }));
  const { data: kanji, ...searchProps } = useSearch(RADICAL_SEARCH_FORM_ID, radicalKanjiQueryParams, data);

  return (
    <Page
      avatar={data.radical.radical}
      title="部首別索引"
      subText={`（現在は旧日本語字形で部首が「${data.radical.radical}」の漢字が登録されていますが、新日本語字形で部首が「${data.radical.radical}」のものに置換予定です。）`}
      action={
        <AdminLinkButton
          aria-label="radical-edit"
          icon={<MdEdit />}
          to={$path(`/radicals/:codePoint/edit`, { codePoint: data.radical.code_point })}
        />
      }
    >
      <RadicalDefine radical={data.radical} />
      <ValidatedForm {...searchProps} action={$path('/radicals/:codePoint', { codePoint })}>
        <SearchPanel>
          <HStack align="center">
            <SearchFormControl
              name="read"
              label="よみかた"
              help="漢字のよみかたは新日本語表音式によるひらがな（訓読み）、カタカナ（音読み）での前方一致で絞り込みができます。"
            >
              <TextInput name="read" placeholder="いち、しょー、つずみ" />
            </SearchFormControl>
            <SearchFormControl name="strokeCount" label="部首内画数">
              <NumberInput
                name="strokeCount"
                placeholder={`${MIN_IN_RADICAL_STOREKE_COUNT}〜${MAX_IN_RADICAL_STOREKE_COUNT}`}
                min={MIN_IN_RADICAL_STOREKE_COUNT}
                max={MAX_IN_RADICAL_STOREKE_COUNT}
              />
            </SearchFormControl>
            <SearchFormControl as="fieldset" name="regular" label="常用漢字">
              <RadioGroup name="regular" radioLabels={REGULAR_RADIO} />
            </SearchFormControl>
          </HStack>
        </SearchPanel>
        <OrderTabs formId={RADICAL_SEARCH_FORM_ID} orders={ORDERS}>
          <TabPanel>
            {'kanjisOrderByStrokeCount' in kanji && (
              <StrokeCountOrder data={kanji.kanjisOrderByStrokeCount} to="/kanjis" />
            )}
          </TabPanel>
          <TabPanel>
            {'kanjisOrderByRead' in kanji && <ReadOrder data={kanji.kanjisOrderByRead} to="/kanjis" />}
          </TabPanel>
        </OrderTabs>
      </ValidatedForm>
    </Page>
  );
};
4;

export default Radical;

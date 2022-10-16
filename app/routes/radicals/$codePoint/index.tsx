import { HStack, TabPanel } from '@chakra-ui/react';
import { type MetaFunction } from '@remix-run/node';
import { useParams } from '@remix-run/react';
import { MdEdit } from 'react-icons/md';
import { $params, $path } from 'remix-routes';
import { ValidatedForm } from 'remix-validated-form';
import AdminLinkButton from '~/components/AdminLinkButton';
import { ORDERS } from '~/components/constants';
import OrderTabs from '~/components/OrderTabs';
import Page from '~/components/Page';
import ReadOrder from '~/components/ReadOrder';
import SearchPanel from '~/components/SearchPanel';
import StrokeCountOrder from '~/components/StrokeCountOrder';
import StrokeCountSearchInput from '~/components/StrokeCountSearchInput';
import ReadSearchInput from '~/features/kanjis/components/ReadSearchInput';
import RegularSelectRadio from '~/features/kanjis/components/RegularSelectRadio';
import {
  MAX_IN_RADICAL_STOREKE_COUNT,
  MIN_IN_RADICAL_STOREKE_COUNT,
  radicalKanjiQueryParams,
} from '~/features/kanjis/validators/params';
import RadicalDefine from '~/features/radicals/components/RadicalDefine';
import { RADICAL_SEARCH_FORM_ID } from '~/features/radicals/constants';
import useMatchesData from '~/hooks/useMatchesData';
import { useSearch } from '~/hooks/useSearch';
import { type loader } from '../$codePoint';

export const meta: MetaFunction = ({ params }) => ({
  title: `新日本語｜部首索引「${String.fromCodePoint(parseInt($params('/radicals/:codePoint', params).codePoint))}」`,
});

const Radical = () => {
  const { codePoint } = $params('/radicals/:codePoint', useParams());
  const data = useMatchesData<typeof loader>($path('/radicals/:codePoint', { codePoint }));
  const { data: kanji, formProps } = useSearch({
    formId: RADICAL_SEARCH_FORM_ID,
    validator: radicalKanjiQueryParams,
    initialData: data,
    action: $path('/radicals/:codePoint', { codePoint }),
  });

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
      <ValidatedForm {...formProps}>
        <SearchPanel>
          <HStack align="center">
            <ReadSearchInput />
            <StrokeCountSearchInput
              label="部首内画数"
              min={MIN_IN_RADICAL_STOREKE_COUNT}
              max={MAX_IN_RADICAL_STOREKE_COUNT}
            />
            <RegularSelectRadio />
          </HStack>
        </SearchPanel>
        <OrderTabs orders={ORDERS}>
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

import { HStack, TabPanel, VStack } from '@chakra-ui/react';
import { json, Response, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { $path } from 'remix-routes';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { ORDERS } from '~/components/constants';
import EditButton from '~/components/EditButton';
import NumberInput from '~/components/NumberInput';
import OrderTabs from '~/components/OrderTabs';
import Page from '~/components/Page';
import ReadOrder from '~/components/ReadOrder';
import SearchFormControl from '~/components/SearchFormControl';
import SearchPanel from '~/components/SearchPanel';
import StrokeCountOrder from '~/components/StrokeCountOrder';
import TextInput from '~/components/TextInput';
import { radicalKanjiReadOrder, radicalKanjiStrokeCountOrder } from '~/features/kanjis/models/radicalKanji.server';
import { radicalKanjiQueryParams } from '~/features/kanjis/validators/params';
import RadicalDefine from '~/features/radicals/components/RadicalDefine';
import { RADICAL_SEARCH_FORM_ID } from '~/features/radicals/constants';
import { radical } from '~/features/radicals/models/radical.server';
import { MAX_STOREKE_COUNT, MIN_STOREKE_COUNT, radicalParams } from '~/features/radicals/validators/params';
import useSearch from '~/hooks/useSearch';

export const meta: MetaFunction = ({ params }) => ({
  title: `新日本語｜部首索引「${String.fromCodePoint(parseInt(params['codePoint']!))}」`,
});

export const loader = async ({ request, params }: LoaderArgs) => {
  const paramsResult = await radicalParams.validate(params);
  if (paramsResult.error) {
    console.log(paramsResult.error.fieldErrors);
    throw new Response('Not Found', { status: 404 });
  }
  const data = await radical(paramsResult.data.codePoint);
  if (data == null) throw new Response('Not Found', { status: 404 });
  const result = await radicalKanjiQueryParams.validate(new URL(request.url).searchParams);
  if (result.error) {
    console.log(result.error.fieldErrors);
    return json({ radical: data, kanjis: validationError(result.error) });
  }
  if (result.data.orderBy === 'read')
    return json({
      radical: data,
      kanjiReadOrder: await radicalKanjiReadOrder(paramsResult.data.codePoint, result.data),
    });
  return json({
    radical: data,
    kanjiStrokeCountOrder: await radicalKanjiStrokeCountOrder(paramsResult.data.codePoint, result.data),
  });
};

const Radical = () => {
  const data = useLoaderData<typeof loader>();
  const { data: kanji, ...searchProps } = useSearch(RADICAL_SEARCH_FORM_ID, radicalKanjiQueryParams, data);

  return (
    <Page
      avatar={data.radical.radical}
      title="部首別索引"
      subText={`（現在は旧日本語字形で部首が「${data.radical.radical}」の漢字が登録されていますが、新日本語字形で部首が「${data.radical.radical}」のものに置換予定です。）`}
      action={<EditButton to={$path(`/radicals/:codePoint`, { codePoint: data.radical.code_point })} />}
    >
      <RadicalDefine radical={data.radical} />
      <ValidatedForm {...searchProps}>
        <SearchPanel>
          <VStack w="full" align="start">
            <HStack align="start">
              <SearchFormControl
                name="read"
                label="よみかた"
                help="漢字のよみかたは新日本語表音式によるひらがな（訓読み）、カタカナ（音読み）での前方一致で絞り込みができます。"
              >
                <TextInput name="read" placeholder="いち、しょー、つずみ" />
              </SearchFormControl>
              <SearchFormControl name="strokeCount" label="部首内画数">
                <NumberInput name="strokeCount" placeholder={`${MIN_STOREKE_COUNT}〜${MAX_STOREKE_COUNT}`} />
              </SearchFormControl>
            </HStack>
          </VStack>
        </SearchPanel>
        <OrderTabs formId={RADICAL_SEARCH_FORM_ID} orders={ORDERS}>
          <TabPanel>
            {'kanjiStrokeCountOrder' in kanji && <StrokeCountOrder data={kanji.kanjiStrokeCountOrder} to="/radicals" />}
          </TabPanel>
          <TabPanel>{'kanjiReadOrder' in kanji && <ReadOrder data={kanji.kanjiReadOrder} to="/radicals" />}</TabPanel>
        </OrderTabs>
      </ValidatedForm>
    </Page>
  );
};
4;

export default Radical;

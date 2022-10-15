import { HStack, Icon } from '@chakra-ui/react';
import { json, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { MdOutlineTranslate } from 'react-icons/md';
import { Virtuoso } from 'react-virtuoso';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { REGULAR_RADIO } from '~/components/constants';
import NumberInput from '~/components/NumberInput';
import Page from '~/components/Page';
import RadioGroup from '~/components/RadioGroup';
import SearchFormControl from '~/components/SearchFormControl';
import SearchPanel from '~/components/SearchPanel';
import TextInput from '~/components/TextInput';
import KanjiItem from '~/features/kanjis/components/KanjiItem';
import { KANJI_SEARCH_FORM_ID } from '~/features/kanjis/constants';
import { kanjiCodePointOrder } from '~/features/kanjis/models/kanji.server';
import { kanjiQueryParams, MAX_STOREKE_COUNT, MIN_STOREKE_COUNT } from '~/features/kanjis/validators/params';
import useSearch from '~/hooks/useSearch';

export const meta: MetaFunction = () => ({
  title: '新日本語｜新日本語漢字一覧',
});

export const loader = async ({ request }: LoaderArgs) => {
  const result = await kanjiQueryParams.validate(new URL(request.url).searchParams);
  if (result.error) {
    console.log(result.error.fieldErrors);
    return validationError(result.error);
  }
  return json({ kajiCodePointOrder: await kanjiCodePointOrder(result.data), offset: result.data.offset });
};

const Index = () => {
  const initialData = useLoaderData<typeof loader>();
  const { data, ...searchProps } = useSearch(KANJI_SEARCH_FORM_ID, kanjiQueryParams, initialData);
  const [kanjis, setKanjis] = useState<Awaited<ReturnType<typeof kanjiCodePointOrder>>>([]);
  const kanjiMoreLoad = () => {
    if ('kajiCodePointOrder' in data) {
      const formData = searchProps.getValues();
      formData.set('offset', (data.offset + 20).toString());
      searchProps.fetcher.submit(formData);
    }
  };

  useEffect(() => {
    if ('kajiCodePointOrder' in data) {
      if (data.offset) {
        setKanjis((prev) => [...prev, ...data.kajiCodePointOrder]);
      } else {
        setKanjis(data.kajiCodePointOrder);
      }
    }
  }, [data]);

  return (
    <Page avatar={<Icon fontSize={24} as={MdOutlineTranslate} />} title="新日本語漢字一覧">
      <ValidatedForm {...searchProps}>
        <SearchPanel>
          <HStack align="center">
            <SearchFormControl
              name="read"
              label="よみかた"
              help="部首名は新日本語表音式によるひらがなでの前方一致で絞り込みができます。"
            >
              <TextInput name="read" placeholder="いち、しょー、つずみ" />
            </SearchFormControl>
            <SearchFormControl name="strokeCount" label="画数">
              <NumberInput
                name="strokeCount"
                placeholder={`${MIN_STOREKE_COUNT}〜${MAX_STOREKE_COUNT}`}
                min={MIN_STOREKE_COUNT}
                max={MAX_STOREKE_COUNT}
              />
            </SearchFormControl>
            <SearchFormControl as="fieldset" name="regular" label="常用漢字">
              <RadioGroup name="regular" radioLabels={REGULAR_RADIO} />
            </SearchFormControl>
          </HStack>
        </SearchPanel>
        <Virtuoso
          useWindowScroll
          data={kanjis}
          endReached={kanjiMoreLoad}
          itemContent={(index, kanji) => <KanjiItem kanji={kanji} isEven={index % 2 === 0} />}
        />
      </ValidatedForm>
    </Page>
  );
};

export default Index;
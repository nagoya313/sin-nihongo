import { HStack, Icon } from '@chakra-ui/react';
import { type ActionArgs, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { Virtuoso } from 'react-virtuoso';
import { ValidatedForm } from 'remix-validated-form';
import FormControl from '~/components/FormControl';
import Page from '~/components/Page';
import SearchFormClearButton from '~/components/SearchFormClearButton';
import SearchPanel from '~/components/SearchPanel';
import SearchStrokeCountInput from '~/components/SearchStrokeCountInput';
import SearchTextInput from '~/components/SearchTextInput';
import { KanjiIcon } from '~/components/icons';
import ForNameSelectRadio from '~/features/kanjis/components/ForNameSelectRadio';
import GlyphImplimentationRadio from '~/features/kanjis/components/GlyphImplimentationRadio';
import JisLevelSelectRadio from '~/features/kanjis/components/JisLevelSelectRadio';
import KanjiItem from '~/features/kanjis/components/KanjiItem';
import RegularSelectRadio from '~/features/kanjis/components/RegularSelectRadio';
import SearchKanjiReadInput from '~/features/kanjis/components/SearchKanjiReadInput';
import SearchRadicalSelectInput from '~/features/kanjis/components/SearchRadicalSelectInput';
import useKanjis from '~/features/kanjis/hooks/useKanjis';
import { create, destroy, index, update } from '~/features/kanjis/services.server';
import { MAX_STROKE_COUNT, MIN_STROKE_COUNT } from '~/features/kanjis/validators';
import { actions, authGuard } from '~/utils/request.server';

export const meta: MetaFunction = () => ({ title: '新日本語｜漢字一覧' });
export const loader = (args: LoaderArgs) => index(args);
export const action = (args: ActionArgs) => authGuard(args, actions({ POST: create, PATCH: update, DELETE: destroy }));

const Index = () => {
  const { data, formProps, moreLoad } = useKanjis();

  return (
    <Page avatar={<Icon fontSize={24} as={KanjiIcon} />} title="新日本語漢字一覧">
      <ValidatedForm {...formProps}>
        <SearchPanel align="stretch">
          <HStack align="center">
            <FormControl name="kanji" label="漢字" help="漢字またわコードポイントから検索できます。">
              <SearchTextInput name="kanji" placeholder="一、u4e00" />
            </FormControl>
            <SearchKanjiReadInput />
            <SearchStrokeCountInput min={MIN_STROKE_COUNT} max={MAX_STROKE_COUNT} />
            <SearchRadicalSelectInput />
          </HStack>
          <HStack align="center">
            <RegularSelectRadio />
            <ForNameSelectRadio />
            <JisLevelSelectRadio />
          </HStack>
          <HStack align="center">
            <GlyphImplimentationRadio />
            <SearchFormClearButton />
          </HStack>
        </SearchPanel>
      </ValidatedForm>
      <Virtuoso
        useWindowScroll
        data={data}
        endReached={moreLoad}
        itemContent={(index, kanji) => <KanjiItem kanji={kanji} isEven={index % 2 === 0} />}
      />
    </Page>
  );
};

export default Index;

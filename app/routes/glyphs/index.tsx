import { HStack, Icon } from '@chakra-ui/react';
import { type ActionArgs, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { MdBuild } from 'react-icons/md';
import { Virtuoso } from 'react-virtuoso';
import { $path } from 'remix-routes';
import { ValidatedForm } from 'remix-validated-form';
import AdminLinkButton from '~/components/AdminLinkButton';
import FormControl from '~/components/FormControl';
import Page from '~/components/Page';
import SearchPanel from '~/components/SearchPanel';
import SearchTextInput from '~/components/SearchTextInput';
import { GlyphIcon } from '~/components/icons';
import GlyphItem from '~/features/glyphs/components/GlyphItem';
import useGlyphs from '~/features/glyphs/hooks/useGlyphs';
import { destroy, index } from '~/features/glyphs/services.server';
import { actions, authGuard } from '~/utils/request.server';

export const meta: MetaFunction = () => ({ title: '新日本語｜グリフ一覧' });
export const loader = (args: LoaderArgs) => authGuard(args, index);
export const action = async (args: ActionArgs) => authGuard(args, actions({ DELETE: destroy }));

const Index = () => {
  const { data, formProps, moreLoad } = useGlyphs();

  return (
    <Page
      avatar={<Icon fontSize={24} as={GlyphIcon} />}
      title="グリフ一覧"
      action={<AdminLinkButton aria-label="glyph-build" icon={<MdBuild />} to={$path('/glyphs/new')} />}
    >
      <ValidatedForm {...formProps}>
        <SearchPanel>
          <HStack align="center">
            <FormControl name="q" label="なまえ">
              <SearchTextInput name="q" />
            </FormControl>
          </HStack>
        </SearchPanel>
      </ValidatedForm>
      <Virtuoso
        useWindowScroll
        data={data}
        endReached={moreLoad}
        itemContent={(index, glyph) => <GlyphItem glyph={glyph} isEven={index % 2 === 0} />}
      />
    </Page>
  );
};

export default Index;

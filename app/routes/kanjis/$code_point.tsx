import { HStack, VStack } from '@chakra-ui/react';
import { type ActionArgs, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { $path } from 'remix-routes';
import Page from '~/components/Page';
import GlyphCanvas from '~/features/kage/components/GlyphCanvas';
import { getGlyphCanvasProps } from '~/features/kage/models/kageData';
import KanjiDefine from '~/features/kanjis/components/KanjiDefine';
import KanjiEditForm from '~/features/kanjis/components/KanjiEditForm';
import { get } from '~/features/kanjis/services.server';
import { update } from '~/features/kanjis/services.server';
import { useOptionalUser } from '~/hooks/useUser';
import { actions, authGuard } from '~/utils/request.server';

export const meta: MetaFunction = () => ({ title: '新日本語｜漢字詳細' });
export const loader = (args: LoaderArgs) => get(args);
export const action = (args: ActionArgs) => authGuard(args, actions({ PATCH: update }));

const Kanji = () => {
  const user = useOptionalUser();
  const { kanji, glyph, sames } = useLoaderData<typeof loader>();

  return (
    <Page avatar={kanji.kanji} title="漢字詳細">
      <VStack align="start">
        <HStack pt={8}>
          {user != null && kanji.glyph_name != null ? (
            <Link to={$path('/glyphs/:name', { name: kanji.glyph_name })}>
              <GlyphCanvas {...getGlyphCanvasProps(glyph)} />
            </Link>
          ) : (
            <GlyphCanvas {...getGlyphCanvasProps(glyph)} />
          )}
          <KanjiDefine kanji={kanji} sames={sames} />
        </HStack>
        {user && <KanjiEditForm kanji={kanji} />}
      </VStack>
    </Page>
  );
};

export default Kanji;

import { HStack } from '@chakra-ui/react';
import { type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Page from '~/components/Page';
import GlyphCanvas from '~/features/kage/components/GlyphCanvas';
import { getGlyphCanvasProps } from '~/features/kage/models/kageData';
import KanjiDefine from '~/features/kanjis/components/KanjiDefine';
import { getByCodePoint } from '~/features/kanjis/services.server';

export const meta: MetaFunction = () => ({ title: '新日本語｜漢字詳細' });
export const loader = async ({ params }: LoaderArgs) => getByCodePoint(params);

const Kanji = () => {
  const { kanji, glyph, sames } = useLoaderData<typeof loader>();

  return (
    <Page avatar={kanji.kanji} title="漢字詳細">
      <HStack pt={8}>
        <GlyphCanvas {...getGlyphCanvasProps(glyph)} />
        <KanjiDefine kanji={kanji} sames={sames} />
      </HStack>
    </Page>
  );
};

export default Kanji;

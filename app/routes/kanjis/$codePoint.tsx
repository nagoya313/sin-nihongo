import { HStack } from '@chakra-ui/react';
import { json, Response, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Page from '~/components/Page';
import { getDrawableGlyphByName } from '~/features/glyphs/models/glyph.server';
import GlyphCanvasSuspense from '~/features/kage/components/GlyphCanvasSuspense';
import { getGlyphCanvasProps } from '~/features/kage/models/kageData';
import KanjiDefine from '~/features/kanjis/components/KanjiDefine';
import { getKanjiByCodePoint, getSameKanjs } from '~/features/kanjis/models/kanji.server';
import { kanjiParams } from '~/features/kanjis/validators/params';
import { checkedParamsLoader } from '~/utils/request.server';

export const meta: MetaFunction = () => ({ title: '新日本語｜漢字詳細' });

export const loader = async ({ params }: LoaderArgs) => {
  const { codePoint } = await checkedParamsLoader(params, kanjiParams);
  const kanji = await getKanjiByCodePoint(codePoint);
  if (kanji == null) throw new Response('Not Found', { status: 404 });
  return json(
    kanji.glyph_name != null
      ? {
          kanji,
          glyph: await getDrawableGlyphByName(kanji.glyph_name),
          sames: (await getSameKanjs(kanji)).map(({ kanji }) => kanji),
        }
      : { kanji, glyph: null, sames: [] },
  );
};

const Kanji = () => {
  const { kanji, glyph, sames } = useLoaderData<typeof loader>();

  return (
    <Page avatar={kanji.kanji} title="漢字詳細">
      <HStack pt={8}>
        <GlyphCanvasSuspense {...getGlyphCanvasProps(glyph)} />
        <KanjiDefine kanji={kanji} sames={sames} />
      </HStack>
    </Page>
  );
};

export default Kanji;

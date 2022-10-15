import { HStack } from '@chakra-ui/react';
import { json, Response, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import GlyphCanvasSuspense from '~/components/GlyphCanvasSuspense';
import Page from '~/components/Page';
import { getGlyphwiki } from '~/features/glyphwiki/models/glyphwiki.server';
import KanjiDefine from '~/features/kanjis/components/KanjiDefine';
import { getKanjiByCodePoint } from '~/features/kanjis/models/kanji.server';
import { kanjiParams } from '~/features/kanjis/validators/params';
import { glyphToBuhin } from '~/kage/kageData';
import { checkedParamsLoader } from '~/utils/request';

export const meta: MetaFunction = ({ params }) => ({
  title: `新日本語｜漢字詳細「${String.fromCodePoint(parseInt(params['codePoint']!))}」`,
});

export const loader = async ({ params }: LoaderArgs) => {
  const { codePoint } = await checkedParamsLoader(params, kanjiParams);
  const kanji = await getKanjiByCodePoint(codePoint);
  if (kanji == null) throw new Response('Not Found', { status: 404 });
  const glyph = await getGlyphwiki(`u${kanji.code_point.toString(16).padStart(4, '0')}`);
  return json({ kanji, glyph });
};

const Kanji = () => {
  const { kanji, glyph } = useLoaderData<typeof loader>();

  return (
    <Page avatar={kanji.kanji} title="漢字詳細">
      <HStack pt={8}>
        <GlyphCanvasSuspense name={glyph.name} buhin={glyphToBuhin(glyph)} />
        <KanjiDefine kanji={kanji} />
      </HStack>
    </Page>
  );
};

export default Kanji;

import { HStack } from '@chakra-ui/react';
import { json, Response, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import GlyphCanvasSuspense from '~/components/GlyphCanvasSuspense';
import Page from '~/components/Page';
import { glyphwiki } from '~/features/glyphwiki/models/glyphwiki.server';
import KanjiDefine from '~/features/kanjis/components/KanjiDefine';
import { kanji } from '~/features/kanjis/models/kanji.server';
import { kanjiParams } from '~/features/kanjis/validators/params';
import { glyphToBuhin } from '~/kage/kageData';

export const meta: MetaFunction = ({ params }) => ({
  title: `新日本語｜漢字詳細「${String.fromCodePoint(parseInt(params['codePoint']!))}」`,
});

export const loader = async ({ params }: LoaderArgs) => {
  const paramsResult = await kanjiParams.validate(params);
  if (paramsResult.error) {
    console.log(paramsResult.error.fieldErrors);
    throw new Response('Not Found', { status: 404 });
  }
  const data = await kanji(paramsResult.data.codePoint);
  if (data == null) throw new Response('Not Found', { status: 404 });
  const glyph = await glyphwiki(`u${data.kanji.codePointAt(0)!.toString(16).padStart(4, '0')}`);
  return json({ kanji: data, glyph });
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

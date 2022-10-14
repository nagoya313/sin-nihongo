import { json, Response, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Page from '~/components/Page';
import KanjiDefine from '~/features/kanjis/components/KanjiDefine';
import { kanji } from '~/features/kanjis/models/kanji.server';
import { radicalParams } from '~/features/radicals/validators/params';

export const meta: MetaFunction = ({ params }) => ({
  title: `新日本語｜漢字「${String.fromCodePoint(parseInt(params['codePoint']!))}」`,
});

export const loader = async ({ params }: LoaderArgs) => {
  const paramsResult = await radicalParams.validate(params);
  if (paramsResult.error) {
    console.log(paramsResult.error.fieldErrors);
    throw new Response('Not Found', { status: 404 });
  }
  const data = await kanji(paramsResult.data.codePoint);
  if (data == null) throw new Response('Not Found', { status: 404 });
  return json(data);
};

const Kanji = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <Page avatar={data.kanji} title="漢字">
      <KanjiDefine kanji={data} />
    </Page>
  );
};

export default Kanji;

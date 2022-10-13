import { json, Response, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { $path } from 'remix-routes';
import EditButton from '~/components/EditButton';
import Page from '~/components/Page';
import { radical } from '~/features/radicals/models/radicals.server';
import { radicalParams } from '~/features/radicals/validators/params';

export const meta: MetaFunction = ({ params }) => ({
  title: `新日本語｜部首索引「${String.fromCodePoint(parseInt(params['codePoint']!))}」`,
});

export const loader = async ({ params }: LoaderArgs) => {
  const result = await radicalParams.validate(params);
  if (result.error) {
    console.log(result.error.fieldErrors);
    throw new Response('Not Found', { status: 404 });
  }
  const data = await radical(result.data.codePoint);
  if (data == null) throw new Response('Not Found', { status: 404 });
  return json(data);
};

const Radical = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <Page
      avatar={data.radical}
      title="部首別索引"
      subText={`（現在は旧日本語字形で部首が「${data.radical}」の漢字が登録されていますが、新日本語字形で部首が「${data.radical}」のものに置換予定です。）`}
      action={<EditButton to={$path(`/radicals/:codePoint`, { codePoint: data.code_point })} />}
    ></Page>
  );
};
4;

export default Radical;

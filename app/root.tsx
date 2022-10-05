import { ChakraProvider, Text } from '@chakra-ui/react';
import { withEmotionCache } from '@emotion/react';
import { type LinksFunction, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from '@remix-run/react';
import { useContext, useEffect } from 'react';
import { ClientStyleContext, ServerStyleContext } from './context';
import Layout from './layout';
import { authenticator } from './session.server';
import { theme } from './styles/theme';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: '新日本語',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap',
  },
];

export const loader = async ({ request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request);
  return { user };
};

type DocumentProps = {
  title?: string;
  children: React.ReactNode;
};

const Document = withEmotionCache(({ title, children }: DocumentProps, emotionCache) => {
  const serverStyleData = useContext(ServerStyleContext);
  const clientStyleData = useContext(ClientStyleContext);

  useEffect(() => {
    emotionCache.sheet.container = document.head;
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      (emotionCache.sheet as any)._insertTag(tag);
    });
    clientStyleData?.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <html lang="ja">
      <head>
        {title != null && <title>{title}</title>}
        <Meta />
        <Links />
        {serverStyleData?.map(({ key, ids, css }) => (
          <style key={key} data-emotion={`${key} ${ids.join(' ')}`} dangerouslySetInnerHTML={{ __html: css }} />
        ))}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
});

export const CatchBoundary = () => {
  const caught = useCatch();

  return (
    <Document title={caught.status === 404 ? 'Page Not Found' : undefined}>
      <ChakraProvider theme={theme}>
        <Text p={4}>{caught.status === 404 ? 'お探しのページは見つかりませんでした。' : caught.statusText}</Text>
      </ChakraProvider>
    </Document>
  );
};

const App = () => (
  <Document>
    <ChakraProvider theme={theme}>
      <Layout>
        <Outlet />
      </Layout>
    </ChakraProvider>
  </Document>
);

export default App;

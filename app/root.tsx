import { Box, ChakraProvider, Heading, Text, useToast, VStack } from '@chakra-ui/react';
import { withEmotionCache } from '@emotion/react';
import {
  json,
  type ErrorBoundaryComponent,
  type LinksFunction,
  type LoaderArgs,
  type MetaFunction,
} from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch, useLoaderData } from '@remix-run/react';
import { useContext, useEffect } from 'react';
import { ClientStyleContext, ServerStyleContext } from './context';
import { useOptionalUser } from './hooks/useUser';
import Layout from './layout';
import { authenticator, commitSessionHeaders, getFlashMessage } from './session.server';
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
  const { flash, session } = await getFlashMessage(request);
  return json({ user, flash }, await commitSessionHeaders(session));
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

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  const user = useOptionalUser();

  return (
    <Document title="Error">
      <ChakraProvider theme={theme}>
        <Box p={8}>
          {user != null ? (
            <>
              <Heading mb={8}>Application Error</Heading>
              <VStack align="start" p={4} overflowX="scroll" whiteSpace="pre" bg="white">
                <Text color="red">{error.stack}</Text>
              </VStack>
            </>
          ) : (
            <Text>なんらかのエラーが発生しました。</Text>
          )}
        </Box>
      </ChakraProvider>
    </Document>
  );
};

export const CatchBoundary = () => {
  const caught = useCatch();

  return (
    <Document title={caught.status === 404 ? 'Page Not Found' : undefined}>
      <ChakraProvider theme={theme}>
        <Box p={8}>
          <Text>{caught.status === 404 ? 'お探しのページは見つかりませんでした。' : caught.statusText}</Text>
        </Box>
      </ChakraProvider>
    </Document>
  );
};

const Toaster = () => {
  const { flash } = useLoaderData<typeof loader>();
  const toast = useToast();

  useEffect(() => {
    if (flash != null) {
      toast({ title: flash.message, status: flash.status });
    }
  }, [flash, toast]);

  return <Outlet />;
};

const App = () => (
  <Document>
    <ChakraProvider theme={theme}>
      <Layout>
        <Toaster />
      </Layout>
    </ChakraProvider>
  </Document>
);

export default App;

import { ChakraProvider } from '@chakra-ui/react';
import { withEmotionCache } from '@emotion/react';
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from '@remix-run/react';
import { useContext, useEffect } from 'react';
import { ClientStyleContext, ServerStyleContext } from './context';
import { theme } from './styles/theme';

type DocumentProps = React.PropsWithChildren<{
  title?: string;
}>;

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
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
});

export default Document;

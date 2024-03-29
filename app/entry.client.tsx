import { CacheProvider } from '@emotion/react';
import { RemixBrowser } from '@remix-run/react';
import { useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { ClientStyleContext } from './context';
import { createEmotionCache } from './createEmotionCache';

type ClientCacheProviderProps = {
  children: React.ReactNode;
};

const ClientCacheProvider = ({ children }: ClientCacheProviderProps) => {
  const [cache, setCache] = useState(createEmotionCache());
  const reset = () => setCache(createEmotionCache());

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
};

hydrateRoot(
  document,
  <ClientCacheProvider>
    <RemixBrowser />
  </ClientCacheProvider>,
);

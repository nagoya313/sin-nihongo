import { Skeleton } from '@chakra-ui/react';
import { type Buhin } from '@kurgm/kage-engine';
import { lazy, Suspense } from 'react';
import { ClientOnly } from 'remix-utils';

const GlyphCanvas = lazy(() => import('./GlyphCanvas'));

type GlyphCanvasSuspenseProps = {
  name?: string;
  buhin?: Buhin;
};

const GlyphCanvasSuspense = ({ name, buhin }: GlyphCanvasSuspenseProps) => (
  <ClientOnly fallback={<Skeleton w="200px" h="200px" />}>
    {() => (
      <Suspense fallback={<Skeleton w="200px" h="200px" />}>
        <GlyphCanvas name={name} buhin={buhin} />
      </Suspense>
    )}
  </ClientOnly>
);

export default GlyphCanvasSuspense;

import { Skeleton } from '@chakra-ui/react';
import { type Buhin } from '@kurgm/kage-engine';
import { Suspense, lazy } from 'react';
import { ClientOnly } from 'remix-utils';

const GlyphCanvasImpl = lazy(() => import('./GlyphCanvasImpl'));

type GlyphCanvasProps = {
  name?: string;
  buhin?: Buhin;
};

const GlyphCanvas = ({ name, buhin }: GlyphCanvasProps) => (
  <ClientOnly fallback={<Skeleton w="200px" h="200px" />}>
    {() => (
      <Suspense fallback={<Skeleton w="200px" h="200px" />}>
        <GlyphCanvasImpl name={name} buhin={buhin} />
      </Suspense>
    )}
  </ClientOnly>
);

export default GlyphCanvas;

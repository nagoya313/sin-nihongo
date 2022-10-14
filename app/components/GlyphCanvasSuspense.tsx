import { Skeleton } from '@chakra-ui/react';
import { type Buhin } from '@kurgm/kage-engine';
import { lazy, Suspense } from 'react';

const GlyphCanvas = lazy(() => import('./GlyphCanvas'));

type GlyphCanvasSuspenseProps = {
  name?: string;
  buhin?: Buhin;
};

const GlyphCanvasSuspense = ({ name, buhin }: GlyphCanvasSuspenseProps) => (
  <Suspense fallback={<Skeleton w="200px" h="200px" />}>
    <GlyphCanvas name={name} buhin={buhin} />
  </Suspense>
);

export default GlyphCanvasSuspense;

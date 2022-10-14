import { Skeleton } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';

const GlyphCanvas = lazy(() => import('./GlyphCanvas'));

const GlyphCanvasSuspense = () => (
  <Suspense fallback={<Skeleton w="200px" h="200px" />}>
    <GlyphCanvas />
  </Suspense>
);

export default GlyphCanvasSuspense;

import { type Timestamp } from '~/db/timestamp';
import { type loader } from '~/routes/glyphs/index';
import { type LoaderData, type UnionSelect } from '~/utils/types';

export type Glyph = Readonly<{
  name: string;
  data: string;
}> &
  Timestamp;

export type GlyphItemData = UnionSelect<LoaderData<typeof loader>, 'glyphs'>['glyphs'][number];

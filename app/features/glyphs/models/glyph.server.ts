import { type ValidatorData } from 'remix-validated-form';
import { db } from '~/db/db.server';
import { escapeLike } from '~/utils/sql';
import { type glyphQueryParams } from '../validators/params';

type QueryParams = ValidatorData<typeof glyphQueryParams>;

export const getGlyphs = ({ q, offset }: QueryParams) =>
  db
    .selectFrom('glyph')
    .select(['name', 'data'])
    .if(!!q, (qb) => qb.where('name', 'like', `${escapeLike(q!)}%`))
    .orderBy('name')
    .offset(offset)
    .limit(20)
    .execute();

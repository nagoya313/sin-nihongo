import { type ReadonlyTuple } from 'type-fest';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { STROKE_TYPES, VALID_STROKE_SHAPE_TYPES } from '~/features/kage/models/constants';

const columnsCount = (type: number) => {
  switch (type) {
    case 0:
    case 1:
    case 9:
      return 7;
    case 2:
    case 3:
    case 4:
      return 9;
    case 6:
    case 7:
    case 99:
      return 11;
    default:
      return 0;
  }
};

const makeNumericTuple = <TLength extends number>(length: TLength) => {
  const result = [...Array(length)].map(() => zfd.numeric());
  return result as ReadonlyTuple<typeof result[number], TLength>;
};

const partLineBase = Object.freeze([zfd.numeric(z.literal(99)), ...makeNumericTuple(6), z.string()] as const);

const strokeBase = z.union([
  z
    .array(zfd.numeric())
    .min(7)
    .refine((type) => type[0] !== 99),
  z.tuple([...partLineBase]),
  z.tuple([...partLineBase, ...makeNumericTuple(3)]),
]);

const isValidColumn = (column: z.infer<typeof strokeBase>) =>
  column.length !== 0 && (column[0] !== 0 || column[1] === 97 || column[1] === 98 || column[1] === 99);

const isValidStrokeShapeTypes = (column: z.infer<typeof strokeBase>) => {
  if (!(STROKE_TYPES as ReadonlyArray<number>).includes(column[0])) return true;
  if (!VALID_STROKE_SHAPE_TYPES.some(([s0, s1, s2]) => s0 === column[0] && s1 === column[1] && s2 === column[2])) {
    return false;
  }

  if (column[0] === 1) {
    const [, s1, s2, x1, y1, x2, y2] = column;
    const isVertical = y1 === y2 ? x1 === x2 : x2 - x1 <= Math.abs(y1 - y2);
    if (isVertical ? s1 === 2 || s2 === 2 : !([0, 2].includes(s1) && [0, 2].includes(s2))) return false;
  }

  return true;
};

const stroke = strokeBase.refine(
  (data) =>
    (data[0] === 99 || data.length === columnsCount(data[0]!)) && isValidColumn(data) && isValidStrokeShapeTypes(data),
);

const strokes = z.array(z.string().refine((data) => stroke.safeParse(data.split(':')).success));

export const kageData = zfd.text().refine((data) => strokes.safeParse(data.split('$')).success, '不正な書式です');

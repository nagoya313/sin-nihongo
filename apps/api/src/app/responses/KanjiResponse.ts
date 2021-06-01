import { Kanji as ApiKanji } from '@sin-nihongo/api-interfaces';
import { Kanji as EntityKanji } from '../entities/Kanji';
import { EntityResponse } from './EntityResponse';

export class KanjiResponse extends EntityResponse<EntityKanji, ApiKanji> {
  toResponse(kanji: EntityKanji): ApiKanji {
    return {
      id: kanji.id,
      ucs: `u${kanji.id.toString(16)}`,
      regular: kanji.regular,
      forName: kanji.forName,
      jisLevel: kanji.jisLevel.id,
      numberOfStrokes: kanji.numberOfStrokes,
      numberOfStrokesInRadicals: kanji.numberOfStrokesInRadical,
      radical: {
        id: kanji.radical.id,
        character: String.fromCodePoint(kanji.radical.id + 0x2eff),
      },
      kunyomis: kanji.kunyomis,
      onyomis: kanji.onyomis,
      character: String.fromCodePoint(kanji.id),
    };
  }
}

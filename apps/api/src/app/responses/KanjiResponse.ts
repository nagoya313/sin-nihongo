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
      jisLevel: kanji.jisLevel,
      numberOfStrokes: kanji.numberOfStrokes,
      numberOfStrokesInRadicals: kanji.numberOfStrokesInRadical,
      radical: {
        id: kanji.radicalId,
        character: String.fromCodePoint(kanji.radicalId + 0x2eff),
      },
      kunyomis: kanji.kunyomi,
      onyomis: kanji.onyomi,
      character: String.fromCodePoint(kanji.id),
    };
  }
}

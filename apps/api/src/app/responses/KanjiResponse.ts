import { KanjiResponse as ApiKanjiResponse } from '@sin-nihongo/api-interfaces';
import { Kanji } from '../entities/Kanji';
import { EntityResponse } from './EntityResponse';
import { toKunyomi, toOnyomi } from '../libs/kana';

export class KanjiResponse extends EntityResponse<Kanji, ApiKanjiResponse> {
  toResponse(kanji: Kanji): ApiKanjiResponse {
    return {
      id: kanji.ucs,
      regular: kanji.regular,
      forName: kanji.forName,
      jisLevel: kanji.jisLevel,
      numberOfStrokes: kanji.numberOfStrokes,
      numberOfStrokesInRadicals: kanji.numberOfStrokesInRadical,
      radicalId: kanji.radicalId,
      kunyomi: kanji.kunyomi.map((yomi) => toKunyomi(yomi)),
      onyomi: kanji.onyomi.map((yomi) => toOnyomi(yomi)),
    };
  }
}

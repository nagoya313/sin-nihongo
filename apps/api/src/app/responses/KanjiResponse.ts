import * as MojiJS from 'mojijs';
import { KanjiResponse as ApiKanjiResponse } from '@sin-nihongo/api-interfaces';
import { Kanji } from '../entities/Kanji';
import { EntityResponse } from './EntityResponse';

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
      kunyomi: kanji.kunyomi.map((yomi) => MojiJS.toHiragana(MojiJS.toFullWidthKana(yomi))),
      onyomi: kanji.onyomi.map((yomi) => MojiJS.toFullWidthKana(yomi)),
    };
  }
}

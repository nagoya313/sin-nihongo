import * as mojiJS from 'mojijs';
import { GetKanjisParams } from '@sin-nihongo/sin-nihongo-params';

export class GetKanjisQueryParams extends GetKanjisParams {
  get ucsParam() {
    if (this.ucs) {
      return this.ucsToNumber || this.kanjiToNumber;
    }
    return undefined;
  }

  private get ucsToNumber() {
    return this.ucs.match(/^u[\da-f]{4,5}$/) ? parseInt(this.ucs.replace('u', ''), 16) : undefined;
  }

  private get kanjiToNumber() {
    const mojiData = mojiJS.getMojiData(mojiJS.codePointAt(this.ucs[0]));
    return mojiData.type.is_kanji ? this.ucs.charCodeAt(0) : undefined;
  }
}

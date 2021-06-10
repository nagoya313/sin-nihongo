import { mojiJS } from 'mojijs';
import { GetKanjisParams } from '@sin-nihongo/sin-nihongo-params';

export class GetKanjisQueryParams extends GetKanjisParams {
  get ucsParam() {
    if (this.ucs) {
      return this.ucsToNumber || this.kanjiToNumber;
    }
    return undefined;
  }

  // ucsが非undefinedの時しか呼ばない
  private get ucsToNumber() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.ucs!.match(/^u[\da-f]{4,5}$/) ? parseInt(this.ucs!.replace('u', ''), 16) : undefined;
  }

  // ucsが非undefinedの時しか呼ばない
  private get kanjiToNumber() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.mojiData.type.is_kanji ? this.ucs!.charCodeAt(0) : undefined;
  }

  private get mojiData() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return mojiJS.getMojiData(mojiJS.codePointAt(this.ucs![0]));
  }
}

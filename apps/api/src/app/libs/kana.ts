import * as MojiJS from 'mojijs';
const mojiJS = MojiJS['default'];

const replaceMojiTable = {
  ぢ: 'じ',
  づ: 'ず',
  ゐ: 'い',
  ゑ: 'え',
  を: 'お',
};

const bobikiTable = {
  ああ: 'あー',
  いい: 'いー',
  うう: 'うー',
  えい: 'えー',
  ええ: 'えー',
  おう: 'おー',
  おお: 'おー',
  かあ: 'かー',
  きい: 'きー',
  くう: 'くー',
  けい: 'けー',
  けえ: 'けー',
  こう: 'こー',
  こお: 'こー',
  さあ: 'さー',
  しい: 'しー',
  すう: 'すー',
  せい: 'せー',
  せえ: 'せー',
  そう: 'そー',
  そお: 'そー',
  たあ: 'たー',
  ちい: 'ちー',
  つう: 'つー',
  てい: 'てー',
  てえ: 'てー',
  とう: 'とー',
  とお: 'とー',
  なあ: 'なー',
  にい: 'にー',
  ぬう: 'ぬー',
  ねい: 'ねー',
  ねえ: 'ねー',
  のう: 'のー',
  のお: 'のー',
  はあ: 'はー',
  ひい: 'ひー',
  ふう: 'ふー',
  へい: 'へー',
  へえ: 'へー',
  ほう: 'ほー',
  ほお: 'ほー',
  ほほ: 'ほー',
  まあ: 'まー',
  みい: 'みー',
  むう: 'むー',
  めい: 'めー',
  めえ: 'めー',
  もう: 'もー',
  もお: 'もー',
  やあ: 'やー',
  ゆう: 'ゆー',
  よう: 'よー',
  よお: 'よー',
  らあ: 'らー',
  りい: 'りー',
  るう: 'るー',
  れい: 'れー',
  れえ: 'れー',
  ろう: 'ろー',
  ろお: 'ろー',
  わあ: 'わー',
  があ: 'がー',
  ぎい: 'ぎー',
  ぐう: 'ぐー',
  げい: 'げー',
  げえ: 'げー',
  ごう: 'ごー',
  ごお: 'ごー',
  ざあ: 'ざー',
  じい: 'じー',
  ずう: 'ずー',
  ぜい: 'ぜー',
  ぜえ: 'ぜー',
  ぞう: 'ぞー',
  ぞお: 'ぞー',
  だあ: 'だー',
  でい: 'でー',
  でえ: 'でー',
  どう: 'どー',
  どお: 'どー',
  ばあ: 'ばー',
  びい: 'びー',
  ぶう: 'ぶー',
  べい: 'べー',
  べえ: 'べー',
  ぼう: 'ぼー',
  ぼお: 'ぼー',
  ぱあ: 'ぱー',
  ぴい: 'ぴー',
  ぷう: 'ぷー',
  ぺい: 'ぺー',
  ぺえ: 'ぺー',
  ぽう: 'ぽー',
  ぽお: 'ぽー',
  きゃあ: 'きゃー',
  きゅう: 'きゅー',
  きょう: 'きょー',
  しょお: 'しょー',
  しゃあ: 'しゃー',
  しゅう: 'しゅー',
  しょう: 'しょー',
  ちゃあ: 'ちゃー',
  ちゅう: 'ちゅー',
  ちょう: 'ちょー',
  ちょお: 'ちょー',
  にゃあ: 'にゃー',
  にゅう: 'にゅー',
  にょう: 'にょー',
  にょお: 'にょー',
  ひゃあ: 'ひゃー',
  ひゅう: 'ひゅー',
  ひょう: 'ひょー',
  ひょお: 'ひょー',
  みゃあ: 'みゃー',
  みゅう: 'みゅー',
  みょう: 'みょー',
  みょお: 'みょー',
  りゃあ: 'りゃー',
  りゅう: 'りゅー',
  りょう: 'りょー',
  りょお: 'りょー',
  ぎゃあ: 'ぎゃー',
  ぎゅう: 'ぎゅー',
  ぎょう: 'ぎょー',
  ぎょお: 'ぎょー',
  じゃあ: 'じゃー',
  じゅう: 'じゅー',
  じょう: 'じょー',
  じょお: 'じょー',
  びゃあ: 'びゃー',
  びゅう: 'びゅー',
  びょう: 'びょー',
  びょお: 'びょー',
  ぴゃあ: 'ぴゃー',
  ぴゅう: 'ぴゅー',
  ぴょう: 'ぴょー',
  ぴょお: 'ぴょー',
};

export const toHiraganaFromRomaji = (text: string) => {
  const kana = mojiJS.toHiraganaFromRomaji(text);
  const notUseKanaRemoved = kana.replace(/ぢ|づ|ゐ|ゑ|を/, (str) => replaceMojiTable[str]);
  return notUseKanaRemoved.replace(new RegExp(Object.keys(bobikiTable).join('|'), 'g'), (str) => bobikiTable[str]);
};

export const toKatakanaFromRomaji = (text: string) => mojiJS.toKatakana(toHiraganaFromRomaji(text));

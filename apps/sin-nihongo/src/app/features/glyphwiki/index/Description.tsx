import React from 'react';
import { NewTabLink } from '../../../components/Link';
import { Text } from '../../../components/Typography';

const GLYPHWIKI_TOP_URL = 'https://glyphwiki.org/wiki/GlyphWiki:%e3%83%a1%e3%82%a4%e3%83%b3%e3%83%9a%e3%83%bc%e3%82%b8';

export const Description: React.VFC = () => (
  <Text>
    <NewTabLink url={GLYPHWIKI_TOP_URL} text="グリフウィキ" />
    からグリフお検索します。漢字一文字或いわグリフウィキのグリフ名から検索できます。
  </Text>
);

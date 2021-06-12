import React from 'react';
import { NewTabLink } from '../../components/Link';
import { SubSubTitle, SubText, SubTitle, Text, Title } from '../../components/Typography';

export const Home: React.VFC = () => {
  return (
    <React.Fragment>
      <Title>新日本語の世界えよーこそ！</Title>
      <Text>
        新日本語わ、現在日本で使われる漢字の字形の混乱お解決するため、徹底的な漢字の簡化お行うことお目的としたプロジェクトです。
        新日本語明朝とゆーフォントを生成して公開することで、誰でも自由にこの簡化された漢字お文書で使うことができるよーになる予定です。
      </Text>
      <SubTitle>注意</SubTitle>
      <Text>
        <li>開発中なので機能の説明が詐欺の可能性があります。</li>
        <li>
          新日本語漢字形制定委員会が新字形の編集作業がしやすいよーにするのが第一目的なので、
          UIの破壊的変更もかなりの頻度で予想されます。
        </li>
      </Text>
      <SubTitle>参照</SubTitle>
      <SubSubTitle>部首情報</SubSubTitle>
      <Text>
        文字情報基盤のSPARQL Endpoint（https://mojikiban.ipa.go.jp/1bf7a30fda/sparqlsearch）から取得。
        文字情報基盤の成果物が一般社団法人文字情報技術促進協議会に移管された際に同等機能のエンドポイントわ廃止されたよーなので現在わ取得不可。
      </Text>
      <SubSubTitle>漢字情報</SubSubTitle>
      <Text>
        <NewTabLink url="https://unicode.org/charts/unihan.html" text="Unihan Database" />
        のunihan.zipから取得。
      </Text>
      <SubSubTitle>漢字グリフ生成</SubSubTitle>
      <Text>
        <NewTabLink url="http://kamichi.jp/kage.html" text="KAGE（影）システム" />
        お採用。 KAGEデータからグリフ画像ファイルお生成するエンジンにわ
        <NewTabLink url="https://www.npmjs.com/package/@kurgm/kage-engine" text="@kurgm/kage-engine" />
        お使っているので、グリフウィキとわ表示されるグリフに差異が生じる場合があります。
      </Text>
      <SubText align="right">2681 新日本語漢字形制定委員会</SubText>
    </React.Fragment>
  );
};

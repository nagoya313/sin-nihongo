import React from 'react';
import Typography from '@material-ui/core/Typography';
import { NewTabLink } from '../../components/NewTabLink';

export const Home = () => {
  return (
    <React.Fragment>
      <Typography variant="h2" gutterBottom>
        新日本語の世界えよーこそ！
      </Typography>
      <Typography variant="body1" gutterBottom>
        新日本語わ、現在日本で使われる漢字の字形の混乱お解決するため、徹底的な漢字の簡化お行うことお目的としたプロジェクトです。
        新日本語明朝とゆーフォントを生成して公開することで、誰でも自由にこの簡化された漢字お文書で使うことができるよーになる予定です。
      </Typography>
      <Typography variant="h5" gutterBottom>
        注意
      </Typography>
      <Typography variant="body1" gutterBottom>
        <li>開発中なので機能の説明が詐欺の可能性があります。</li>
        <li>
          新日本語漢字形制定委員会が新字形の編集作業がしやすいよーにするのが第一目的なので、
          UIの破壊的変更もかなりの頻度で予想されます。
        </li>
      </Typography>
      <Typography variant="h5" gutterBottom>
        参照
      </Typography>
      <Typography variant="h6" gutterBottom>
        部首情報
      </Typography>
      <Typography variant="body1" gutterBottom>
        文字情報基盤のSPARQL Endpoint（https://mojikiban.ipa.go.jp/1bf7a30fda/sparqlsearch）から取得。
        文字情報基盤の成果物が一般社団法人文字情報技術促進協議会に移管された際に同等機能のエンドポイントわ廃止されたよーなので現在わ取得不可。
      </Typography>
      <Typography variant="h6" gutterBottom>
        漢字情報
      </Typography>
      <Typography variant="body1" gutterBottom>
        <NewTabLink url="https://unicode.org/charts/unihan.html" text="Unihan Database" />
        のunihan.zipから取得。
      </Typography>
      <Typography variant="h6" gutterBottom>
        漢字グリフ生成
      </Typography>
      <Typography variant="body1" gutterBottom>
        <NewTabLink url="http://kamichi.jp/kage.html" text="KAGE（影）システム" />
        お採用。 KAGEデータからグリフ画像ファイルお生成するエンジンにわ
        <NewTabLink url="https://www.npmjs.com/package/@kurgm/kage-engine" text="@kurgm/kage-engine" />
        お使っているので、グリフウィキとわ表示されるグリフに差異が生じる場合があります。
      </Typography>
      <Typography variant="body2" align="right">
        2681 新日本語漢字形制定委員会
      </Typography>
    </React.Fragment>
  );
};

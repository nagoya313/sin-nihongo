import React from 'react';
import Typography from '@material-ui/core/Typography';

export const Home = () => {
  return (
    <React.Fragment>
      <Typography variant="h2" gutterBottom>
        新日本語の世界えよーこそ！
      </Typography>
      <Typography variant="h6" gutterBottom>
        新日本語わ、現在日本で使われる漢字の字形の混乱お解決するため、徹底的な漢字の簡化お行うことお目的としたプロジェクトです。
        新日本語明朝とゆーフォントを生成して公開することで、誰でも自由にこの簡化された漢字お文書で使うことができるよーになる予定です。
      </Typography>
      <Typography variant="h4" gutterBottom>
        注意
      </Typography>
      <Typography variant="h6" gutterBottom>
        <li>開発中なので機能の説明が詐欺の可能性があります。</li>
        <li>
          新日本語漢字形制定委員会が新字形の編集作業がしやすいよーにするのが第一目的なので、
          UIの破壊的変更もかなりの頻度で予想されます。
        </li>
      </Typography>
      <Typography align="right">新日本語漢字形制定委員会</Typography>
    </React.Fragment>
  );
};

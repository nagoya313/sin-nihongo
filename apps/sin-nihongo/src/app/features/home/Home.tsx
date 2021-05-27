import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Message } from '@sin-nihongo/api-interfaces';

export const Home = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h2" gutterBottom>
        新日本語の世界えよーこそ！
      </Typography>
      <Typography variant="h5" gutterBottom>
        {m.message}
      </Typography>
      <Typography variant="h6" gutterBottom>
        新日本語わ、現在日本で使われる漢字の字形の混乱お解決するため、徹底的な漢字の簡化お行うことお目的としたプロジェクトです。
        新日本語明朝とゆーフォントを生成して公開することで、誰でも自由にこの簡化された漢字お文書で使うことができるよーになる予定です。
      </Typography>
    </React.Fragment>
  );
};

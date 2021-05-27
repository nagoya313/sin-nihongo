import React, { useEffect, useState } from 'react';
import { Message } from '@sin-nihongo/api-interfaces';

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>新日本語の世界へようこそ！</h1>
      </div>
      <div>{m.message}</div>
    </>
  );
};

export default App;

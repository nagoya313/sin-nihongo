import { cleanup, getByText, render, waitFor } from '@testing-library/react';
import React from 'react';
import App from './app';

describe('App', () => {
  it('レンダリングに成功すること', async () => {
    const { baseElement } = render(<App />);
    await waitFor(() => getByText(baseElement, '新日本語'));
  });
});

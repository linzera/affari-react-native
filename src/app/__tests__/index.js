/**
 * @format
 */

import React from 'react';
import { render, wait } from '@testing-library/react-native';

import App from '../';

test('<App />', async () => {
  const { queryByText } = render(<App />);

  await wait(() => {
    expect(queryByText(/Affari/i)).not.toBeNull();
  });
});

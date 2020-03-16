/**
 * @format
 */

import React from 'react';
import { render } from '@testing-library/react-native';

import App from '../';

test('<App />', () => {
  const { queryByText } = render(<App />);
  expect(queryByText(/Affari/i)).not.toBeNull();
});

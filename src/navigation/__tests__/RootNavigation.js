/**
 * @format
 */
import React from 'react';
import { render } from '@testing-library/react-native';
import RootNavigation from '../RootNavigation';

test('<RootNavigation />', () => {
  const { queryByText } = render(<RootNavigation />);

  expect(queryByText(/Affari/i)).not.toBeNull();
});

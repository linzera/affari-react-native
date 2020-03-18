/**
 * @format
 */
import React from 'react';
import { render, wait } from '@testing-library/react-native';
import RootNavigation from '../RootNavigation';

test('<RootNavigation />', async () => {
  const { queryByText } = render(<RootNavigation />);

  await wait(() => {
    expect(queryByText(/Affari/i)).not.toBeNull();
  });
});

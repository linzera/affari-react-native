/**
 * @format
 */

import React from 'react';
import { render } from '@testing-library/react-native';

import Home from '../';

test('<Home />', () => {
  const { queryByTestId } = render(<Home />);

  expect(queryByTestId('TodoList')).toBeNull();
  expect(queryByTestId('EmptyState')).toBeNull();
});

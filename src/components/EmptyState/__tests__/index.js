/**
 * @format
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import EmptyState from '../';

test('<EmptyState />', () => {
  const onPress = jest.fn();

  const { queryAllByText, queryByLabelText } = render(
    <EmptyState
      title="Title"
      subtitle="Some subtitle"
      buttonText="Press me"
      onPress={onPress}
    />,
  );

  expect(queryAllByText(/Title/i)).not.toBeNull();
  expect(queryAllByText(/Some subtitle/i)).not.toBeNull();
  expect(queryAllByText(/Press me/i)).not.toBeNull();

  const button = queryByLabelText('EmptyStateButton');

  fireEvent.press(button);

  expect(onPress).toHaveBeenCalled();
});

/**
 * @format
 */

import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react-native';

import TodoFormModal from '../';

import useTodo from '~/hooks/useTodo';

jest.mock('<rootDir>/hooks/useTodo');

test('<TodoFormModal />', async () => {
  const addTodo = jest.fn();

  useTodo.mockImplementation(() => ({
    addTodo,
  }));

  const onDismiss = jest.fn();

  const { queryByTestId, queryByLabelText, rerender } = render(
    <TodoFormModal isVisible={false} onDismiss={onDismiss} />,
  );

  expect(queryByTestId('TodoForm')).toBeNull();

  rerender(<TodoFormModal isVisible onDismiss={onDismiss} />);

  expect(queryByTestId('TodoForm')).not.toBeNull();

  const input = queryByTestId('TodoFormInput');
  const submitButton = queryByLabelText('Button');

  fireEvent.changeText(input, 'Some new task');
  fireEvent.press(submitButton);

  expect(addTodo).toHaveBeenCalledWith('Some new task');

  rerender(<TodoFormModal isVisible={false} onDismiss={onDismiss} />);

  await wait(() => {
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});

/**
 * @format
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TodoItem from '../';
import { IntlProvider } from 'react-intl';

import useTodo from '~/hooks/useTodo';

jest.mock('<rootDir>/hooks/useTodo');

test('<TodoItem />', async () => {
  const toggleTodo = jest.fn();

  useTodo.mockImplementation(() => ({
    removeTodo: jest.fn(),
    toggleTodo,
  }));

  const mockedTodo = {
    id: 123123,
    title: 'Some title',
    createdAt: new Date(),
    finished: false,
  };

  const { getByText, getByTestId, rerender } = render(
    <IntlProvider locale="en">
      <TodoItem {...mockedTodo} />
    </IntlProvider>,
  );

  expect(getByText(/Some title/i)).not.toBeNull();
  expect(getByText(/Criado/i)).not.toBeNull();

  const uncheckedCheckbox = getByTestId('TodoCheckbox');
  expect(uncheckedCheckbox.props.checked).toBe(false);

  rerender(
    <IntlProvider locale="en">
      <TodoItem {...mockedTodo} finished />
    </IntlProvider>,
  );

  const checkedCheckbox = getByTestId('TodoCheckbox');
  expect(checkedCheckbox.props.checked).toBe(true);

  fireEvent.press(checkedCheckbox);

  expect(toggleTodo).toHaveBeenCalledWith(mockedTodo.id);
});

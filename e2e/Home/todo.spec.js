/**
 * @format
 */

import { device } from 'detox';
import {
  elementById,
  elementByLabel,
  tapByLabel,
  typeTextById,
  longPressById,
  tapByLabelAndType,
  tapById,
  elementByText,
} from '../helpers';

describe('Affari home', () => {
  async function addTodo() {
    await expect(elementById('HomeScreen')).toBeVisible();
    await expect(elementByLabel('EmptyStateButton')).toBeVisible();

    await tapByLabel('EmptyStateButton');

    await expect(elementById('TodoForm')).toBeVisible();

    await typeTextById('TodoFormInput', 'New todo');
    await tapByLabel('TodoFormSubmitButton');
  }

  it('should have a home screen', async () => {
    await expect(elementById('HomeScreen')).toBeVisible();
  });

  it('should add a todo', async () => {
    await addTodo();
    await expect(elementById('TodoListItem')).toBeVisible();
  });

  it('should toggle a todo', async () => {
    await expect(elementByText('Tarefas')).toBeVisible();

    await tapById('TodoListItem');
    await expect(elementByText('Tarefas')).toBeNotVisible();
    await expect(elementByText('Tarefas concluídas')).toBeVisible();

    await tapById('TodoCheckbox');
    await expect(elementByText('Tarefas')).toBeVisible();
    await expect(elementByText('Tarefas concluídas')).toBeNotVisible();
  });

  it('should remove a todo', async () => {
    const todoListItem = elementById('TodoListItem');

    await longPressById('TodoListItem');

    const platform = await device.getPlatform();

    if (platform === 'ios') {
      await tapByLabelAndType('Remover', '_UIAlertControllerActionView');
    }

    await expect(todoListItem).toNotExist();
  });
});

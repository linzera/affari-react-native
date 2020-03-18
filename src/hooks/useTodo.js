/**
 * @flow
 * @format
 */

import React, { useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export type Todo = {
  id: number,
  title: string,
  finished: boolean,
  createdAt: Date,
};

type TodoContextType = {
  todos: Todo[],
  isLoading: boolean,
  addTodo: (newTodoName: string) => void,
  removeTodo: (todoId: number) => void,
  toggleTodo: (todoId: number) => void,
};

export const defaultValue = {
  todos: [],
  isLoading: true,
  addTodo: () => {},
  removeTodo: () => {},
  toggleTodo: () => {},
};

export const TodoContex = React.createContext<TodoContextType>(defaultValue);

const STORAGE_KEY = '@todos';

type Props = {
  children: React$Node,
};

type State = {
  todos: Todo[],
  isLoading: boolean,
};

export function TodoProvider(props: Props) {
  const [values, setValues] = useState<State>({
    todos: [],
    isLoading: true,
  });

  function persistTodos() {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ todos: values.todos }));
  }

  useEffect(() => {
    async function getTodosFromStorage() {
      const result = await AsyncStorage.getItem(STORAGE_KEY);

      if (result === null) {
        persistTodos();
        setValues({ ...values, isLoading: false });
      }

      if (result) {
        const parsedResult = JSON.parse(result);
        setValues({ isLoading: false, todos: parsedResult.todos });
      }
    }

    getTodosFromStorage();
  }, []);

  useEffect(() => {
    persistTodos();
  }, [values.todos]);

  function addTodo(newTodoName: string) {
    const newTodo: Todo = {
      id: Math.random(),
      createdAt: new Date(),
      finished: false,
      title: newTodoName,
    };

    setValues({ ...values, todos: [...values.todos, newTodo] });
  }

  function removeTodo(todoId: number) {
    const updatedTodos = values.todos.filter(item => item.id !== todoId);

    setValues({ ...values, todos: updatedTodos });
  }

  function toggleTodo(todoId: number) {
    const updatedTodos = values.todos.map(item => {
      if (todoId !== item.id) {
        return item;
      }

      return {
        ...item,
        finished: !item.finished,
      };
    });

    setValues({ ...values, todos: updatedTodos });
  }

  return (
    <TodoContex.Provider
      value={{
        todos: values.todos,
        isLoading: values.isLoading,
        addTodo,
        removeTodo,
        toggleTodo,
      }}>
      {props.children}
    </TodoContex.Provider>
  );
}

export default function useTodo() {
  return useContext(TodoContex);
}

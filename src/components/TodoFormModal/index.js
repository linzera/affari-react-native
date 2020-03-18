/**
 * @flow
 * @format
 */
import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Divider, Title, Button, Portal } from 'react-native-paper';

import { Modalize } from 'react-native-modalize';

import useTodo from '~/hooks/useTodo';

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  title: { fontSize: 24 },
  input: { marginTop: 16 },
});

type Props = {
  isVisible: boolean,
  onDismiss: () => void,
};

export default function TodoFormModal({ isVisible, onDismiss }: Props) {
  const { addTodo } = useTodo();
  const [newTodoName, setTodoName] = useState('');
  const modalizeRef = useRef(null);

  useEffect(() => {
    if (modalizeRef.current && isVisible) {
      modalizeRef.current.open();
    }
  }, [isVisible]);

  function closeTodoForm() {
    if (modalizeRef.current) {
      modalizeRef.current.close();
    }
  }

  function onSubmit() {
    addTodo(newTodoName);
    setTodoName('');
    closeTodoForm();
  }

  return (
    <Portal>
      <Modalize
        keyboardAvoidingBehavior="padding"
        adjustToContentHeight
        scrollViewProps={{ keyboardShouldPersistTaps: 'always' }}
        ref={modalizeRef}
        onClosed={onDismiss}>
        <View testID="TodoForm" style={styles.container}>
          <Title style={styles.title}>Nova tarefa</Title>
          <Divider />
          <TextInput
            testID="TodoFormInput"
            value={newTodoName}
            onChangeText={value => setTodoName(value)}
            style={styles.input}
            label="Nome"
            autoFocus
            onSubmitEditing={onSubmit}
          />
          <Button
            accessibilityLabel="Button"
            style={styles.button}
            mode="outlined"
            onPress={onSubmit}>
            Adicionar
          </Button>
        </View>
      </Modalize>
    </Portal>
  );
}

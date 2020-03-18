/**
 * @format
 * @flow
 */
import React from 'react';
import { Alert, LayoutAnimation, View, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { CheckBox } from 'native-base';
import { useIntl } from 'react-intl';
import * as Animatable from 'react-native-animatable';

import useTodo, { type Todo } from '~/hooks/useTodo';

const ListItem = Animatable.createAnimatableComponent(List.Item);

const styles = StyleSheet.create({
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 16,
  },
});

type Props = {
  ...Todo,
};

export default function TodoItem({ id, title, createdAt, finished }: Props) {
  const { removeTodo, toggleTodo } = useTodo();
  const { formatDate, formatTime } = useIntl();

  function toggle() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleTodo(id);
  }

  function alertTodoRemoval() {
    Alert.alert(
      'Deseja remover a tarefa?',
      `A tarefa ${title} será removida!`,
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Remover',
          onPress: () => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );
            removeTodo(id);
          },
        },
      ],
      { cancelable: false },
    );
  }

  return (
    <ListItem
      testID="TodoListItem"
      title={title}
      description={`Criado em ${formatDate(createdAt)} ás ${formatTime(
        createdAt,
      )}`}
      onPress={toggle}
      onLongPress={alertTodoRemoval}
      right={() => (
        <View style={styles.checkboxContainer}>
          <CheckBox
            testID="TodoCheckbox"
            color="#8BC34A"
            checked={finished}
            onPress={toggle}
          />
        </View>
      )}
      animation="fadeIn"
      useNativeDriver
    />
  );
}

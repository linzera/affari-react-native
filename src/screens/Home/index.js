/**
 * @flow
 * @format
 */

import React, { useState, useMemo } from 'react';
import { View, StyleSheet, SectionList, LayoutAnimation } from 'react-native';
import { Title, FAB, Appbar, ProgressBar } from 'react-native-paper';

import useTodo, { type Todo } from '~/hooks/useTodo';

import EmptyState from '~/components/EmptyState';
import TodoFormModal from '~/components/TodoFormModal';
import TodoItem from '~/components/TodoItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#8BC34A',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  title: {
    color: 'white',
  },
  header: {
    elevation: 0,
  },
});

function todoSections(todos: Todo[]) {
  return [
    {
      title: 'Tarefas',
      data: todos.filter(item => !item.finished),
    },
    {
      title: 'Tarefas concluídas',
      data: todos.filter(item => item.finished),
    },
  ];
}

export default function HomeScreen() {
  const { todos, isLoading } = useTodo();
  const [formVisibility, setFormVisibility] = useState(false);

  const hasTodoItems = todos.length > 0;

  function openForm() {
    setFormVisibility(true);
  }

  function onDismissForm() {
    setFormVisibility(false);
  }

  const sections = useMemo(() => todoSections(todos), [todos]);

  function renderSectionHeader({ section: { title, data } }) {
    const shouldRenderHeader = data.length > 0;

    return (
      <If condition={shouldRenderHeader}>
        <View style={styles.sectionHeader}>
          <Title style={styles.title}>{title}</Title>
        </View>
      </If>
    );
  }

  function renderItem({ item }) {
    return <TodoItem {...item} />;
  }

  return (
    <View testID="HomeScreen" style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content color="white" title="Affari" />
      </Appbar.Header>
      <Choose>
        <When condition={isLoading}>
          <ProgressBar indeterminate visible progress={1} />
        </When>
        <When condition={hasTodoItems}>
          <>
            <SectionList
              testID="TodoList"
              style={styles.container}
              keyExtractor={(item, index) => item.id}
              sections={sections}
              renderSectionHeader={renderSectionHeader}
              renderItem={renderItem}
            />
            <If condition={!formVisibility}>
              <FAB
                testID="TodoFAB"
                style={styles.fab}
                color="white"
                icon="plus"
                onPress={openForm}
              />
            </If>
          </>
        </When>
        <Otherwise>
          <EmptyState
            iconName="calendar"
            title="Sem tarefas?"
            subtitle="Clique no botão abaixo para adicionar sua primeira tarefa"
            buttonText="Adicionar tarefa"
            onPress={openForm}
          />
        </Otherwise>
      </Choose>
      <TodoFormModal isVisible={formVisibility} onDismiss={onDismissForm} />
    </View>
  );
}

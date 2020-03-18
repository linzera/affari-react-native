/**
 * @flow
 * @format
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Subheading, Button } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  subheading: {
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
  },
  buttonLabel: {
    color: 'white',
  },
  icon: {
    fontSize: 80,
  },
});

type Props = {
  iconName: string,
  title: string,
  subtitle?: string,
  buttonText?: string,
  buttonIcon?: string,
  onPress?: () => void,
};

export default function EmptyState({
  iconName,
  title,
  subtitle,
  buttonText,
  onPress,
}: Props) {
  return (
    <View style={styles.emptyState}>
      {/** $FlowFixMe */}
      <Icon style={styles.icon} name={iconName} />
      <Title>{title}</Title>
      <If condition={!!subtitle}>
        <Subheading style={styles.subheading}>{subtitle}</Subheading>
      </If>
      <If condition={!!buttonText}>
        <Button
          accessibilityLabel="EmptyStateButton"
          contentDescription="EmptyStateButton"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          mode="contained"
          onPress={onPress}>
          {buttonText}
        </Button>
      </If>
    </View>
  );
}

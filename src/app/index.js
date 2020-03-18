/**
 * @format
 * @flow
 */

import React from 'react';
import { Platform, UIManager } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { IntlProvider } from 'react-intl';

import RootNavigation from '~/navigation/RootNavigation';
import { TodoProvider } from '~/hooks/useTodo';

import theme from '~/styles/theme';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function App() {
  return (
    <PaperProvider theme={theme}>
      <IntlProvider locale="pt-BR" timeZone="America/Sao_Paulo">
        <TodoProvider>
          <RootNavigation />
        </TodoProvider>
      </IntlProvider>
    </PaperProvider>
  );
}

export default App;

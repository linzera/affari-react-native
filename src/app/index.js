/**
 * @format
 * @flow
 */

import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { IntlProvider } from 'react-intl';

import RootNavigation from '~/navigation/RootNavigation';
import { TodoProvider } from '~/hooks/useTodo';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#8BC34A',
    accent: '#4CAF50',
    text: '#212121',
    divider: '#BDBDBD',
  },
};

function App() {
  return (
    <PaperProvider theme={theme}>
      <IntlProvider locale="pt-BR">
        <TodoProvider>
          <RootNavigation />
        </TodoProvider>
      </IntlProvider>
    </PaperProvider>
  );
}

export default App;

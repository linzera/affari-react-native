/**
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import { Platform, UIManager } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { IntlProvider } from 'react-intl';
import SplashScreen from 'react-native-splash-screen';

import RootNavigation from '~/navigation/RootNavigation';
import { TodoProvider } from '~/hooks/useTodo';

import theme from '~/styles/theme';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function App() {
  useEffect(() => {
    SplashScreen.hide();
  });

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

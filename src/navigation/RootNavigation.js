/**
 * @flow
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '~/screens/Home';

const HomeStack = createStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <HomeStack.Navigator headerMode="none">
        <HomeStack.Screen name="Home" component={HomeScreen} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

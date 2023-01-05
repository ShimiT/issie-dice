import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
const StackNav = createNativeStackNavigator();
const { Navigator, Screen } = StackNav;

const Stack = createNativeStackNavigator();

import Home from './pages/Home';
import Settings from './pages/settings'

export default function App() {
  return (
    <NavigationContainer>
      <Navigator>
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            headerRight: () => (
              <Button
                title='Settings'
                onPress={() => (true)}
              />
            ),
            title: 'Home'
          }}
        ></Stack.Screen>
        <Stack.Screen name="Settings" component={Settings} />
      </Navigator>
    </NavigationContainer>
  );
}
import { StyleSheet, View, Text, Button, Image, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
const StackNav = createNativeStackNavigator();
const { Navigator, Screen } = StackNav;

import Home from './pages/Home';

export default function App() {
  const [click,setOnlicked]= useState(false)
  return (
      <NavigationContainer>
        <Navigator>
          <Screen
              name="home"
              component={Home}
              options={{
                headerRight: () => (
                <Button
                  title= 'Settings'
                  onPress={()=>(true)}
                />
                ),
                title: 'Home'
              }}
          ></Screen>
        </Navigator>
      </NavigationContainer>
  );
}
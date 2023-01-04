import { StyleSheet, View, Text, Button, Image, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
const StackNav = createNativeStackNavigator();
const { Navigator, Screen } = StackNav;

import Home from './pages/Home';
import Settnigs from './pages/Settings';

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
                  title= 'Setting'
                  onPress={()=>(true)}
                  // <Image source={require('./assets/icon.png')} />
                    // {click?<Settnigs></Settnigs>:""}
                />
                ),
                title: 'Home'
              }}
          ></Screen>
          <Screen
              name="Settings"
              component={Settnigs}
              options={{
                title: 'Yael'
              }}
          ></Screen>
        </Navigator>
      </NavigationContainer>
  );
}
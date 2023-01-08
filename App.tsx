import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalStoreProvider } from 'react-native-global-store';

const StackNav = createNativeStackNavigator();
const { Navigator, Screen } = StackNav;

const Stack = createNativeStackNavigator();

import Home from './pages/Home';
import SettingsButton from './components/settingsButton';
import Settings from './pages/SettingsScreen';
import { View } from 'react-native';
import { IconComponentProvider } from '@react-native-material/core';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import IStoreState from './interfaces/IStoreState';

const initialState = {
  count: 1,
  recoveryTime: 5,
  numOfCubes: 2,
  recoveryOn: false,
  size: 'S',
  cubeSize: 'M',
  diceType: 'dots'
};

const persistedKeys = [
  // 'count',
  // 'recoveryTime',
  // 'recoveryOn',
  // 'size',
  // 'cubeSize'
];

export default function App() {
  return (
    <GlobalStoreProvider
      initialState={initialState}
      persistedKeys={persistedKeys}
    >
      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <NavigationContainer>
          <Navigator>
            <Stack.Screen name="home" component={Home}></Stack.Screen>
            <Stack.Screen name="settings" component={Settings} />
          </Navigator>
        </NavigationContainer>
      </IconComponentProvider>
    </GlobalStoreProvider>
  );
}

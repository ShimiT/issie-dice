import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const StackNav = createNativeStackNavigator();
const { Navigator, Screen } = StackNav;

const Stack = createNativeStackNavigator();

import Home from './pages/Home';
import Settings from './pages/settings'
import SettingsButton from './components/settingsButton'

export default function App() {
  return (
    <NavigationContainer>
      <Navigator>
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            headerRight: () => (
              <SettingsButton></SettingsButton>
            ),
            title: 'Issie-Dice'
          }}
        ></Stack.Screen>
        <Stack.Screen name="Settings" component={Settings} />
      </Navigator>
    </NavigationContainer>
  );
}
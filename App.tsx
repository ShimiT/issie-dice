import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const StackNav = createNativeStackNavigator();
const { Navigator, Screen } = StackNav;

import Home from './pages/Home';
import Settings from './pages/settings'

export default function App() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="home"
          component={Settings}
          options={{
            title: 'Home'
          }}
        ></Screen>
      </Navigator>
    </NavigationContainer>
  );
}

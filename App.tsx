import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const StackNav = createNativeStackNavigator();
const { Navigator, Screen } = StackNav;

import Home from './pages/Home';

export default function App() {
  return (
      <NavigationContainer>
        <Navigator>
          <Screen
              name="home"
              component={Home}
              options={{
                title: 'Home'
              }}
          ></Screen>
        </Navigator>
      </NavigationContainer>
  );
}

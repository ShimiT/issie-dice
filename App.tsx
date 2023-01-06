import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalStoreProvider } from "react-native-global-store";

const StackNav = createNativeStackNavigator();
const { Navigator, Screen } = StackNav;

const Stack = createNativeStackNavigator();

import Home from './pages/Home';
import SettingsButton from './components/settingsButton'
import Settings from "./pages/settings";

const initialState = {
    count: 1,
    recoveryTime: 10,
    recoveryOn: false,
    size: 'M',
};

const persistedKeys = ["count", "recoveryTime", "recoveryOn", "size"];



export default function App() {
    return (
        <GlobalStoreProvider
            initialState={initialState}
            persistedKeys={persistedKeys}
        ><NavigationContainer>
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
        </GlobalStoreProvider>
    );
}

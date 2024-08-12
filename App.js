import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as MediaLibrary from 'expo-media-library';
import Home from "./screens/home";
import One from "./screens/one";
import Two from './screens/two';
import Three from './screens/three';
import Four from './screens/four';
import Five from './screens/five';
import Six from './screens/six';
import Seven from './screens/seven';
import SevenTwo from './screens/seven-two';
import Eight from './screens/eight';
import EightTwo from './screens/eight-two';
import Nine from './screens/nine';
import NineY from './screens/nine-y';
import NineVx from './screens/nine-vx';
import NineVy from './screens/nine-vy';
import NineV from './screens/nine-v';

export default function App() {
    const [status, requestPermission] = MediaLibrary.usePermissions();
    if (status === null) {
        requestPermission();
    }

    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                />
                <Stack.Screen
                    name="Challenge One"
                    component={One}
                />
                <Stack.Screen
                    name="Challenge Two"
                    component={Two}
                />
                <Stack.Screen
                    name="Challenge Three"
                    component={Three}
                />
                <Stack.Screen
                    name="Challenge Four"
                    component={Four}
                />
                <Stack.Screen
                    name="Challenge Five"
                    component={Five}
                />
                <Stack.Screen
                    name="Challenge Six"
                    component={Six}
                />
                <Stack.Screen
                    name="Challenge Seven"
                    component={Seven}
                />
                <Stack.Screen
                    name="Challenge Seven (2)"
                    component={SevenTwo}
                />
                <Stack.Screen
                    name="Challenge Eight"
                    component={Eight}
                />
                <Stack.Screen
                    name="Challenge Eight (2)"
                    component={EightTwo}
                />
                <Stack.Screen
                    name="Challenge Nine"
                    component={Nine}
                />
                <Stack.Screen
                    name="Challenge Nine (2)"
                    component={NineY}
                />
                <Stack.Screen
                    name="Challenge Nine (3)"
                    component={NineVx}
                />
                <Stack.Screen
                    name="Challenge Nine (4)"
                    component={NineVy}
                />
                <Stack.Screen
                    name="Challenge Nine (5)"
                    component={NineV}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

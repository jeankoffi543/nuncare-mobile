/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/types';
import StartPageOneScreen from './screens/StartPageOneScreen';
import { options } from './constants/config';
import StartPageTwoScreen from './screens/StartPageTwoScreen';
import MenuScreen from './screens/MenuScreen';

// import MenuScreen from './screens/MenuScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  useEffect(() => {
    const init = async () => {};

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="StartPageOneScreen"
            component={StartPageOneScreen}
            options={options.startPageOne}
          />
          <Stack.Screen
            name="StartPageTwoScreen"
            component={StartPageTwoScreen}
            options={options.startPageOne}
          />
          <Stack.Screen
            name="MenuScreen"
            component={MenuScreen}
            options={options.menu}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

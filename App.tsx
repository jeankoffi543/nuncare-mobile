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
import PharmaciesOnDutyScreen from './screens/PharmaciesOnDutyScreen';
import useLocation from './hooks/useLocation';
import AllPharmaciesScreen from './screens/AllPharmaciesScreen';
import MapScreen from './screens/MapScreen';
import AllMedicinesScreen from './screens/AllMedicinesScreen';
import AllMedicinesInsurancesScreen from './screens/AllMedicinesInsurancesScreen';

// import MenuScreen from './screens/MenuScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const { requestPermission, isGranted } = useLocation();

  useEffect(() => {
    const init = async () => {};
    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);

  if (!isGranted) {
    requestPermission();
  }

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

          <Stack.Screen
            name="PharmaciesOnDutyScreen"
            component={PharmaciesOnDutyScreen}
            options={options.extraMenu}
          />

          <Stack.Screen
            name="AllPharmaciesScreen"
            component={AllPharmaciesScreen}
            options={options.extraMenu}
          />

          <Stack.Screen
            name="AllMedicinesScreen"
            component={AllMedicinesScreen}
            options={options.extraMenu}
          />

          <Stack.Screen
            name="AllMedicinesInsurancesScreen"
            component={AllMedicinesInsurancesScreen}
            options={options.extraMenu}
          />

          <Stack.Screen
            name="MapScreen"
            component={MapScreen}
            options={options.extraMenu}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

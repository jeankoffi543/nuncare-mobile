import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SCREEN_WIDTH } from '../constants/config';
import HomeScreen from './HomeScreen';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function MenuScreen() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
          width: SCREEN_WIDTH * 0.7,
        },
        swipeEnabled: false,
      }}
      key={Math.random()}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

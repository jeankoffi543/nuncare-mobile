import { Dimensions } from 'react-native';
import { ScreenOptions } from '../types/types';

export const options: ScreenOptions = {
  startPageOne: {
    headerShown: false,
    animationDuration: 0,
    animation: 'slide_from_right',
  },
  startPageTwo: {
    headerShown: false,
    animationDuration: 0,
    animation: 'slide_from_left',
  },
  home: {
    headerShown: false,
    animationDuration: 0,
  },
  menu: {
    animationDuration: 0,
    headerShown: false,
  },
};

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

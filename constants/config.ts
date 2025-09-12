import { Dimensions } from 'react-native';
import { ScreenOptions } from '../types/types';

export const options: ScreenOptions = {
  startPageOne: {
    headerShown: false,
  },
};

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

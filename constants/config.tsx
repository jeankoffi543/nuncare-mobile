import { Dimensions } from 'react-native';
import { ScreenOptions } from '../types/types';
import Header from '../components/header';

export const options: ScreenOptions = {
  startPageOne: {
    headerShown: false,
    animation: 'slide_from_right',
  },
  startPageTwo: {
    headerShown: false,
    animation: 'slide_from_left',
  },
  home: {
    headerShown: true,
    header: () => <Header />,
  },
};

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

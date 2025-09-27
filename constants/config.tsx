import { Dimensions } from 'react-native';
import { ScreenOptions } from '../types/types';
import ExtraHeader from '../components/extra-header';
import ExtraHeader2 from '../components/extra-header-2';
import CommentEditHeader from '../components/comment-edit-header';

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
  extraMenu: {
    header: () => <ExtraHeader />,
    presentation: 'modal',
    animation: 'none',
  },
  extraMenu2: {
    header: () => <ExtraHeader2 />,
    presentation: 'modal',
    animation: 'none',
  },
  commentEdit: {
    header: () => <CommentEditHeader />,
    animationDuration: 0,
    animation: 'slide_from_left',
    statusBarStyle: 'dark',
    statusBarBackgroundColor: '#fff',
  },
};

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

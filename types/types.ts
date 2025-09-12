import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export type RootStackParamList = {
  StartPageOneScreen: undefined;
  StartPageTwoScreen: undefined;
};

export type ScreenOptions = {
  [key: string]: NativeStackNavigationOptions;
};

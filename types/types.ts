import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export type RootStackParamList = {
  StartPageOne: undefined;
};

export type ScreenOptions = {
  [key: string]: NativeStackNavigationOptions;
};

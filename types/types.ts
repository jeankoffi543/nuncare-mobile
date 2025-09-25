import { GeolocationResponse } from '@react-native-community/geolocation';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { PharmaciesOnDutyResource } from './resources/PharmaciesOnDutyResource';
import { PharmacyResource } from './resources/PharmacyResource';

export type RootStackParamList = {
  StartPageOneScreen: undefined;
  StartPageTwoScreen: undefined;
  HomeScreen: undefined;
  MenuScreen: undefined;
  PharmaciesOnDutyScreen: undefined;
  AllPharmaciesScreen: undefined;
  MapScreen: {
    data: PharmaciesOnDutyResource | PharmacyResource | null;
  };
};

export type ScreenOptions = {
  [key: string]: NativeStackNavigationOptions;
};

export type Links = {
  last: string | null;
  first: string | null;
  next: number | null;
  prev: number | null;
};

export type ReduxStore = {
  position: GeolocationResponse | undefined;
  subscriptionId: number | null;
};

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export type MetaLinks = {
  active: boolean;
  label: string | null;
  url: string | null;
  page: number | null;
};

export type Meta = {
  current_page: number;
  from: number;
  last_page: number;
  links: MetaLinks[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export interface ResponseCollection<T> {
  data: T[];
  link: Links;
  meta: Meta;
}

export type ErrorResponse = {
  error: string;
  message: string;
  status: number;
};

export enum PharmacyStatus {
  ACTIVE = 'active',
  SUSPENDED = 'inactive',
}

export enum PharmacyOnDuty {
  DAY = 'day',
  NIGHT = 'night',
  TWENTYFOUR = '24h',
}

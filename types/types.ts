import { GeolocationResponse } from '@react-native-community/geolocation';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { PharmaciesOnDutyResource } from './resources/PharmaciesOnDutyResource';
import { PharmacyResource } from './resources/PharmacyResource';
import { PublicationResource } from './resources/PublicationResource';
import { CommentResource } from './resources/CommentResource';

export type RootStackParamList = {
  StartPageOneScreen: undefined;
  StartPageTwoScreen: undefined;
  HomeScreen: undefined;
  MenuScreen: undefined;
  PharmaciesOnDutyScreen: undefined;
  AllPharmaciesScreen: undefined;
  AllMedicinesInsurancesScreen: undefined;
  AllMedicinesScreen: undefined;
  ActualityScreen: {
    data: PublicationResource | null;
  };
  MapScreen: {
    data: PharmaciesOnDutyResource | PharmacyResource | null;
  };
  CommentEditScreen: {
    id_publication: number | null | undefined;
    comment: CommentResource | null;
    onSave: (updatedComment: CommentResource) => void;
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

export interface ResponseJson<T> {
  data: T;
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

export enum MedicineScheme {
  INSURED = 'insured',
  NON_INSURED = 'non-insured',
}

export enum InsuranceStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

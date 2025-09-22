import Geolocation, {
  GeolocationError,
  GeolocationOptions,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import { useState } from 'react';
// import type { GeolocationOptions } from '@react-native-community/geolocation';

const useLocation = (options?: GeolocationOptions) => {
  const [isGranted, setIsGranted] = useState(false);
  const [error, setError] = useState<GeolocationError | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);
  const [position, setPosition] = useState<GeolocationResponse | null>(null);

  const requestPermission = () =>
    Geolocation.requestAuthorization(
      () => {
        setIsGranted(true);
      },
      err => {
        setIsGranted(false);
        setError(err);
      },
    );

  const watchPosition = () => {
    try {
      const watchID = Geolocation.watchPosition(
        pos => {
          // console.log(pos);
          setPosition(pos);
        },
        err => {
          setError(err);
        },
        options,
      );
      setSubscriptionId(watchID);
    } catch (err) {}
  };

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setPosition(pos);
      },
      err => setError(err),
      options,
    );
  };

  const clearWatch = () => {
    subscriptionId !== null && Geolocation.clearWatch(subscriptionId);
    setSubscriptionId(null);
    setPosition(null);
  };

  return {
    requestPermission,
    isGranted,
    error,
    watchPosition,
    clearWatch,
    position,
    getCurrentPosition,
  };
};

export default useLocation;

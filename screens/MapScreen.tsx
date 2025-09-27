import { StyleSheet, View } from 'react-native';
import Map from '../components/map';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { useEffect } from 'react';
import useLocation from '../hooks/useLocation';

type MapScreenRouteProp = RouteProp<RootStackParamList, 'MapScreen'>;

const MapScreen: React.FC = () => {
  const route = useRoute<MapScreenRouteProp>();
  const { data } = route.params;
  const { position, watchPosition, clearWatch, getCurrentPosition } =
    useLocation({
      distanceFilter: 1,
      enableHighAccuracy: false,
      maximumAge: 1000,
      interval: 1000,
    });

  useEffect(() => {
    if (!position) {
      getCurrentPosition();
    }
  }, [position, getCurrentPosition]);

  useEffect(() => {
    watchPosition();
    return () => clearWatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Map data={data} currentPosition={position} showTuile />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

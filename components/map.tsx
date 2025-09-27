import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import WebView from 'react-native-webview';
import {
  formatDuration,
  formatPharmacy,
  getReadableDistance,
} from '../libs/utils';
import { PharmaciesOnDutyResource } from '../types/resources/PharmaciesOnDutyResource';
import { PharmacyResource } from '../types/resources/PharmacyResource';
import { GeolocationResponse } from '@react-native-community/geolocation';
import { COLORS } from '../constants/colors';
import { IMAGES } from '../constants/images';
import { useRouteInfo } from '../hooks/useRouteInfo';
import Search from './search';
import axios from 'axios';
import { ResponseCollection } from '../types/types';
import { API_URLS, MAP } from '../constants/urls';
import useDebounce from '../hooks/useDebounce';
import { useCallback, useEffect, useState } from 'react';
import Pressable from './pressable';

type Props = {
  data: PharmaciesOnDutyResource | PharmacyResource | null;
  currentPosition?: GeolocationResponse | null;
  showTuile?: boolean;
};

const Map: React.FC<Props> = ({ data, currentPosition, showTuile }) => {
  const [dataState, setDataState] = useState<
    PharmaciesOnDutyResource | PharmacyResource | null
  >(data);
  const pharmacyLat = Number(
    formatPharmacy(dataState, 'latitude') ?? MAP.CI_LAT,
  );
  const pharmacyLng = Number(
    formatPharmacy(dataState, 'longitude') ?? MAP.CI_LONG,
  );

  const userLat = Number(currentPosition?.coords?.latitude ?? MAP.CI_LAT);
  const userLng = Number(currentPosition?.coords?.longitude ?? MAP.CI_LONG);

  const { webviewRef, html, duration, distance, onMessage, onMapLoad } =
    useRouteInfo(
      userLat,
      userLng,
      pharmacyLat,
      pharmacyLng,
      formatPharmacy(dataState, 'name'),
    );
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 100);
  const [pharmacy, setPharmacy] = useState<PharmacyResource[]>([]);

  const handleSearch = useCallback(async () => {
    let queryParams;

    if (debouncedSearch) {
      queryParams = `?search=${encodeURIComponent(debouncedSearch)}`;
    }
    const res = await axios.get<ResponseCollection<PharmacyResource>>(
      `${API_URLS.PHARMACIES}${queryParams}`,
    );
    setPharmacy(res.data.data);
  }, [debouncedSearch]);

  const handleOnPressSearch = (
    data_: PharmacyResource | PharmaciesOnDutyResource | null,
  ) => {
    setPharmacy([]);
    setDataState(data_);
  };

  useEffect(() => {
    if (!debouncedSearch) {
      setPharmacy([]);
      return;
    }
    (async () => {
      await handleSearch();
    })();
  }, [debouncedSearch, handleSearch]);

  return (
    <View style={styles.container}>
      <WebView
        key={formatPharmacy(dataState, 'id_pharmacy')} // force le WebView à se recréer
        ref={webviewRef}
        originWhitelist={['*']}
        source={{ html }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadEnd={onMapLoad}
        onMessage={onMessage}
      />

      {showTuile && (
        <>
          <View style={styles.searchContainer}>
            {/* Search */}
            <Search
              placeholder="Rechercher de pharmacie"
              onChangeText={setSearch}
              defaultValue={formatPharmacy(dataState, 'name')}
            />
            {pharmacy.length > 0 && (
              <ScrollView style={styles.searchResults}>
                {pharmacy.map((p, i) => (
                  <Pressable
                    key={p.id_pharmacy.toString()}
                    style={
                      i % 2 === 0
                        ? styles.searchResulsItem1
                        : styles.searchResulsItem2
                    }
                    onPress={() => handleOnPressSearch(p)}
                  >
                    <Text style={styles.searchText}>{p.name} </Text>
                  </Pressable>
                ))}
              </ScrollView>
            )}
          </View>
          <View style={styles.description}>
            {/* Call */}
            <Pressable
              onPress={() =>
                Linking.openURL(`tel:${formatPharmacy(dataState, 'phone')}`)
              }
            >
              <Image
                source={IMAGES.ICON_CALL}
                style={styles.call}
                accessibilityLabel="Nucare call icon"
              />
            </Pressable>

            <Text numberOfLines={2} style={styles.title}>
              {formatPharmacy(dataState, 'name')}
            </Text>
            <View style={styles.location}>
              <Image source={IMAGES.ICON_LOCATION} />
              <Text style={styles.locationText}>
                {`${formatDuration(duration!)}`}
              </Text>
            </View>

            <Text style={styles.locationText}>
              {getReadableDistance(distance!)}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  description: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#fff',
    height: 150,
    width: '80%',
    borderRadius: 10,
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Euclid Circular A Medium',
    fontWeight: '500',
    fontSize: 20,
    color: COLORS.primaryDark,
    textAlign: 'center',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 20,
    color: COLORS.gray_40,
    flexShrink: 1,
    width: '100%',
  },
  searchContainer: {
    position: 'absolute',
    top: 20,
    paddingHorizontal: 30,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  searchResults: {
    elevation: 5,
    backgroundColor: '#fff',
    maxHeight: 200,
  },
  searchResulsItem1: {
    backgroundColor: COLORS.backgroundLight,
    padding: 10,
  },
  searchResulsItem2: {
    backgroundColor: '#fff',
    padding: 10,
  },
  searchText: {
    fontFamily: 'Euclid Circular A Regular',
    fontSize: 14,
  },
  call: {
    position: 'absolute',
    resizeMode: 'contain',
    width: 50,
    height: 50,
    right: 0,
    bottom: 100,
  },
});

export default Map;

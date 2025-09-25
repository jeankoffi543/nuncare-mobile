import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SCREEN_WIDTH } from '../constants/config';
import { PharmaciesOnDutyResource } from '../types/resources/PharmaciesOnDutyResource';
import { COLORS } from '../constants/colors';
import axios from 'axios';
import { API_URLS } from '../constants/urls';
import { ResponseCollection, RootStackParamList } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Pharmacy from '../components/pharmacy';
import Search from '../components/search';
import { IMAGES } from '../constants/images';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { scheduleOnRN } from 'react-native-worklets';

type Props = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'PharmaciesOnDutyScreen'
  >;
};

// Custom hook for debouncing
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PharmaciesOnDutyScreen: React.FC<Props> = ({ navigation }) => {
  const [pharmaciesOfDuty, setPharmaciesOfDuty] = useState<
    PharmaciesOnDutyResource[]
  >([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const onEndReachedCalledDuringMomentum = useRef(false);
  const debouncedSearch = useDebounce(search, 100);

  const fetchList = useCallback(
    async (pageNumber: number): Promise<void> => {
      setLoading(true);
      try {
        let queryParams = `?page=${pageNumber}`;

        if (debouncedSearch) {
          queryParams += `&search=${encodeURIComponent(debouncedSearch)}`;
        }

        const res = await axios.get<
          ResponseCollection<PharmaciesOnDutyResource>
        >(`${API_URLS.PHARMACIES_ON_DUTY}${queryParams}`);

        const newItems = res.data.data;

        setPharmaciesOfDuty(prev =>
          pageNumber === 1 ? newItems : [...prev, ...newItems],
        );
        setPage(pageNumber);

        if (res.data.meta.current_page >= res.data.meta.last_page) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (err) {
        console.error('Erreur lors du fetch:', err);
      } finally {
        setLoading(false);
      }
    },
    [debouncedSearch],
  );

  const handleMore = useCallback(() => {
    if (loading || !hasMore || onEndReachedCalledDuringMomentum.current) {
      return;
    }
    onEndReachedCalledDuringMomentum.current = true;
    fetchList(page + 1);
  }, [fetchList, hasMore, loading, page]);

  const renderFooter = useMemo(() => {
    if (loading) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      );
    } else {
      return (
        <View style={styles.footer}>
          <Text style={styles.footerText}>Aucune donnée</Text>
        </View>
      );
    }
  }, [loading]);

  const goLeft = () => {
    navigation.navigate('AllPharmaciesScreen');
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX([-30, 30])
    .failOffsetY([-10, 10])
    .onEnd(event => {
      if (event.translationX < -50) {
        scheduleOnRN(goLeft);
      }
    });

  React.useEffect(() => {
    // fetch actualities
    (async () => await fetchList(1))();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect which depends on the unbounded search value
  useEffect(() => {
    if (!debouncedSearch && pharmaciesOfDuty.length > 0) return;

    // Reset states and start a new search
    setPage(1);
    setHasMore(true);
    setPharmaciesOfDuty([]);
    fetchList(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={panGesture}>
        <View style={styles.mainContainer}>
          {/* Tab */}
          <View style={styles.lineContainer}>
            <Image
              source={IMAGES.LINE}
              accessibilityLabel="Nuncare tab pharmacies on duty"
              style={styles.line}
            />
          </View>
          <View style={styles.container}>
            {/* Pharmacy */}
            <Text style={styles.actualityTitle}>Pharmacie de garde</Text>

            {/* Search */}
            <Search
              placeholder="Rechercher de pharmacie"
              onChangeText={setSearch}
            />

            <FlatList
              data={pharmaciesOfDuty}
              keyExtractor={item => item.id_duty.toString()}
              renderItem={({ item }) => <Pharmacy data={item} />}
              onEndReached={handleMore}
              onEndReachedThreshold={0.5}
              contentContainerStyle={styles.contentContainer}
              ListFooterComponent={renderFooter}
              // Use onMomentumScrollBegin to reset the reference
              onMomentumScrollBegin={() => {
                onEndReachedCalledDuringMomentum.current = false;
              }}
            />
          </View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default PharmaciesOnDutyScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 10,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    letterSpacing: -0.8,
    color: '#000000',
    textAlign: 'center',
  },
  cardText: {
    fontFamily: 'Euclid Circular A Regular',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: -0.5,
  },
  card: {
    width: SCREEN_WIDTH / 3 - 20,
    height: SCREEN_WIDTH / 3 - 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    gap: 5,
  },
  cardActionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  advertissmentContainer: {
    marginTop: 20,
    width: '100%',
    height: 100,
  },
  advertissment: {
    width: '100%',
    height: '100%',
  },
  footer: {
    paddingVertical: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 50,
  },
  footerText: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'justify',
    fontSize: 20,
    color: COLORS.grayLight,
  },
  actualityTitle: {
    fontFamily: 'Euclid Circular A Bold',
    fontWeight: '700',
    fontSize: 16,
  },
  contentContainer: {
    gap: 10,
  },
  line: {
    width: '50%',
  },
  lineContainer: {
    alignItems: 'flex-end',
  },
});

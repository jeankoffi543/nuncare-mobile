import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import { IMAGES } from '../constants/images';
import Card from '../components/card';
import { SCREEN_WIDTH } from '../constants/config';
import { PublicationResource } from '../types/resources/PublicationResource';
import Actuality from '../components/actuality';
import { COLORS } from '../constants/colors';
import axios from 'axios';
import { API_URLS } from '../constants/urls';
import { ResponseCollection, RootStackParamList } from '../types/types';
import { AdvertisementResource } from '../types/resources/AdvertisementResource';
import Header from '../components/header';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;
};
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [advertissment, setAdvertissment] =
    useState<AdvertisementResource | null>(null);
  const [actulity, setActulity] = useState<PublicationResource[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPublications = async (pageNumber: number) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await axios.get<ResponseCollection<PublicationResource>>(
        `${API_URLS.PUBLICATIONS}?page=${pageNumber}&scopes[]=with_count&scopes[]=with_user_like`,
        {
          headers: {
            Authorization: `Bearer 5|u3hmf4kgfuXMbV0M2c1nSpLvKuiMsOfT7e94tRIC2bf4e27d`,
          },
        },
      );

      // Laravel retourne souvent { data, meta, links }
      const newItems = res.data.data;
      setActulity(prev => [...prev, ...newItems]);

      // Vérifier s’il reste des pages
      if (res.data.meta.current_page >= res.data.meta.last_page) {
        setHasMore(false);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleMore = async () => {
    if (!loading && hasMore) {
      setPage(prev => {
        const nextPage = prev + 1;
        fetchPublications(nextPage);
        return nextPage;
      });
    }
  };

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

  useFocusEffect(
    React.useCallback(() => {
      setAdvertissment(null);
      setActulity([]);
      // fetch advertissments
      (async () => {
        const res = await axios.get<ResponseCollection<AdvertisementResource>>(
          API_URLS.ADVERTISSEMENTS,
        );
        setAdvertissment(res.data.data.length > 0 ? res.data.data[0] : null);
      })();

      // fetch actualities
      (async () => await fetchPublications(1))();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  return (
    <>
      {/* Header */}
      <Header navigation={navigation} />

      <View style={styles.container}>
        <StatusBar hidden={true} />
        {/* Action */}
        <View style={styles.cardActionContainer}>
          {/* Pharmacy */}
          <Card
            onPress={() => {
              navigation.navigate('AllPharmaciesScreen');
            }}
            style={styles.card}
          >
            <Image
              source={IMAGES.ICON_PHARMACY}
              accessibilityLabel="Nuncare icon pharmacy"
            />
            <Text style={styles.cardText} numberOfLines={2}>
              Pharmacies
            </Text>
          </Card>

          {/* Medicine */}
          <Card
            onPress={() => {
              navigation.navigate('AllMedicinesScreen');
            }}
            style={styles.card}
          >
            <Image
              source={IMAGES.ICON_MEDICINE}
              accessibilityLabel="Nuncare icon pharmacy"
            />
            <Text style={styles.cardText} numberOfLines={2}>
              Médicaments
            </Text>
          </Card>
        </View>

        {/* advertissment */}
        {advertissment && advertissment.media && (
          <View style={styles.advertissmentContainer}>
            <Image
              source={{ uri: advertissment.media }}
              style={styles.advertissment}
              accessibilityLabel="Nuncare advertissment"
            />
          </View>
        )}

        {/* Actuality */}
        <Text style={styles.actualityTitle}>Actualités</Text>
        <FlatList
          data={actulity}
          keyExtractor={item => item.id_publication.toString()}
          renderItem={({ item }) => <Actuality data={item} />}
          onEndReached={handleMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.contentContainer}
          ListFooterComponent={renderFooter}
        />
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    fontFamily: 'Euclid Circular A Medium',
    fontWeight: '500',
    fontSize: 20,
    marginVertical: 20,
  },
  contentContainer: {
    gap: 10,
  },
});

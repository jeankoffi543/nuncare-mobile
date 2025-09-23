import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/colors';
import { PharmaciesOnDutyResource } from '../types/resources/PharmaciesOnDutyResource';
import { PharmacyResource } from '../types/resources/PharmacyResource';
import Pressable from './pressable';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { IMAGES } from '../constants/images';
import { formatPharmacy, getReadableDistance } from '../libs/utils';
import { format } from 'date-fns';
import { GeolocationResponse } from '@react-native-community/geolocation';
import Map from './map';

type Props = {
  data: PharmaciesOnDutyResource | PharmacyResource | null;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  position: GeolocationResponse | null;
};

const PharmacDetail: React.FC<Props> = ({
  data,
  setModalVisible,
  position,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          SystemNavigationBar.navigationShow();
          setModalVisible(false);
        }}
      >
        <Image
          source={IMAGES.TABLER_X}
          style={styles.close}
          accessibilityLabel="Nuncare icon close"
        />
      </Pressable>
      <Text style={styles.title} numberOfLines={3}>
        {' '}
        {formatPharmacy(data, 'name')}
      </Text>
      <View style={styles.body}>
        <Text style={styles.information}> Informations</Text>
        <Text style={styles.itemTitle}>
          Adresse {'\n'}
          <Text style={styles.itemValue} numberOfLines={3}>
            {' '}
            {formatPharmacy(data, 'address')}
          </Text>
        </Text>

        <Text style={styles.itemTitle}>
          Téléphone {'\n'}
          <Text style={styles.itemValue} numberOfLines={3}>
            {' '}
            {formatPharmacy(data, 'phone')}
          </Text>
        </Text>

        <Text style={styles.itemTitle}>
          Pharmacien(ne) {'\n'}
          <Text style={styles.itemValue} numberOfLines={3}>
            {' '}
            {formatPharmacy(data, 'pharmacist_name')}
          </Text>
        </Text>

        {'duty' in data! && data?.duty ? (
          <Text style={styles.itemTitle}>
            Période de garde {'\n'}
            <Text style={styles.itemValue}>
              {format(
                new Date(data?.duty?.end_date!),
                "'de garde jusqu’au'  dd/MM/yyyy",
              )}
            </Text>
          </Text>
        ) : (
          'end_date' in data! && (
            <Text style={styles.itemTitle}>
              data && (
              <Text style={styles.itemValue}>
                {format(
                  new Date(data?.end_date!),
                  "'de garde jusqu’au'  dd/MM/yyyy",
                )}
              </Text>
              )
            </Text>
          )
        )}

        <Text style={styles.itemTitle}>
          Distance {'\n'}
          <Text style={styles.itemValue} numberOfLines={3}>
            {' '}
            {getReadableDistance(
              {
                latitude: position?.coords?.latitude,
                longitude: position?.coords?.longitude,
              },
              {
                latitude: Number(formatPharmacy(data, 'latitude')),
                longitude: Number(formatPharmacy(data, 'longitude')),
              },
            )}
            {' de votre position'}
          </Text>
        </Text>
      </View>

      <View style={styles.mapTitle}>
        <Text style={styles.itemTitle}>Localisation {'\n'}</Text>
        <Pressable>
          <Text style={styles.mapButton}>Voir sur la carte</Text>
        </Pressable>
      </View>
      <Map data={data} />
    </View>
  );
};

export default PharmacDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    padding: 20,
    borderRadius: 16,
  },
  close: {
    width: 25,
    height: 25,
    alignSelf: 'flex-end',
  },
  title: {
    fontFamily: 'Euclid Circular A Medium',
    fontWeight: '500',
    fontSize: 28,
    color: COLORS.primaryDark,
    lineHeight: 30,
  },
  body: {
    marginTop: 20,
  },
  information: {
    fontFamily: 'Euclid Circular A Bold',
    fontWeight: '700',
    fontSize: 28,
    color: COLORS.primaryDark,
    lineHeight: 30,
  },
  itemTitle: {
    fontFamily: 'Euclid Circular A Bold',
    fontWeight: '700',
    fontSize: 16,
    color: COLORS.primaryDark,
    marginTop: 10,
  },
  itemValue: {
    fontFamily: 'Euclid Circular A Regular',
    fontWeight: '400',
    fontSize: 16,
    color: COLORS.primaryDark,
  },
  mapTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mapButton: {
    fontFamily: 'Euclid Circular A Bold',
    fontWeight: '700',
    fontSize: 14,
    color: COLORS.primary,
  },
});

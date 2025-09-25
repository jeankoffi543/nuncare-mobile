import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../constants/colors';
import { IMAGES } from '../constants/images';
import { PharmaciesOnDutyResource } from '../types/resources/PharmaciesOnDutyResource';
import { formatPharmacy, getReadableDistanceFromCoord } from '../libs/utils';
import useLocation from '../hooks/useLocation';
import { PharmacyResource } from '../types/resources/PharmacyResource';
import { format } from 'date-fns';
import PharmacDetail from './pharmacy-detail';
import SystemNavigationBar from 'react-native-system-navigation-bar';

type Props = {
  data: PharmaciesOnDutyResource | PharmacyResource | null;
};

const Pharmacy: React.FC<Props> = ({ data }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { watchPosition, clearWatch, position, getCurrentPosition } =
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
    <>
      <TouchableOpacity
        onPress={() => {
          SystemNavigationBar.navigationHide();
          setModalVisible(true);
        }}
      >
        <View style={styles.container}>
          <Image
            source={IMAGES.ICON_PHARMACY_2}
            style={styles.defaultMedia}
            accessibilityLabel="Nuncare icon pharmacy 2"
          />
          <View style={styles.description}>
            <Text style={styles.descriptionTitle} numberOfLines={1}>
              {formatPharmacy(data, 'name')}
            </Text>
            <Text style={styles.descriptionText} numberOfLines={1}>
              {formatPharmacy(data, 'address')}
              {' Tel: '}
              {formatPharmacy(data, 'phone')}
            </Text>
            <Text style={styles.descriptionText1} numberOfLines={1}>
              {'duty' in data! && data?.duty ? (
                <Text style={styles.descriptionText2}>
                  {format(
                    new Date(data?.duty?.end_date!),
                    "'de garde jusqu’au'  dd/MM/yyyy",
                  )}
                </Text>
              ) : (
                'end_date' in data! &&
                data && (
                  <Text style={styles.descriptionText2}>
                    {format(
                      new Date(data?.end_date!),
                      "'de garde jusqu’au'  dd/MM/yyyy",
                    )}
                  </Text>
                )
              )}
              {' À '}
              {getReadableDistanceFromCoord(
                {
                  latitude: position?.coords?.latitude,
                  longitude: position?.coords?.longitude,
                },
                {
                  latitude: Number(formatPharmacy(data, 'latitude')),
                  longitude: Number(formatPharmacy(data, 'longitude')),
                },
              )}{' '}
              de vous
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent
        statusBarTranslucent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <PharmacDetail
              data={data}
              setModalVisible={setModalVisible}
              position={position}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Pharmacy;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  media: {
    width: 50,
    height: 50,
  },
  defaultMedia: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  description: {
    flex: 1,
    flexShrink: 1,
  },
  descriptionTitle: {
    fontFamily: 'Euclid Circular A Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    color: COLORS.primaryDark,
  },
  descriptionText: {
    fontFamily: 'EncodeSansSemiExpanded-Light',
    fontWeight: '300',
    fontSize: 9,
    letterSpacing: 0,
  },
  descriptionText1: {
    fontFamily: 'EncodeSansSemiExpanded-Light',
    fontWeight: '300',
    fontSize: 9,
    letterSpacing: 0,
  },
  descriptionText2: {
    fontFamily: 'EncodeSansSemiExpanded-Light',
    fontWeight: '300',
    fontSize: 9,
    letterSpacing: 0,
    color: COLORS.primary,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.gray, // Arrière-plan semi-transparent
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.gray_51,
    elevation: 5,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
});
